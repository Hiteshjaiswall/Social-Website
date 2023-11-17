{
    
    let createPost = function () {
        let newPostForm = $('#new-post-form');
        newPostForm.off('submit');
        newPostForm.submit(function (e) {
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success:function (data) {
                    console.log(data);
                    noty('success', 'yayyyy thanks for posting')
                    let newPost = newPostDom(data.data.post);
                    $('#post-lists-container>ul').prepend(newPost);
                    // Call the deletePost function and pass in the delete link
                    deletePost($('.delete-post-button', newPost));
                },
                error: function (err) {
                    console.log(err.responseText);
                }
            });
        });
    }

    let newPostDom = function (post) {
        return $(`
            <li id="post-${post._id}">
                <div id="post-content">
                    ${post.content}
                    <a href="/posts/destroy/${post._id}" class="delete-post-button"> <i class="fa-solid fa-trash delete-post-button"></i></a>
                </div>
                <span>By</span>
                <small style="color: blue;">
                    ${post.user.name}
                </small>
                <div class="post-comment">
                    <form action="/comments/create" method="post">
                        <input type="text" name="content" placeholder="Comments....." required>
                        <input type="hidden" name="post" value="${post._id}">
                        <input type="submit" value="Add Comment" id="button">
                    </form>
                </div>
                <div id="post-comment-list">
                    <ul id="post-comments-${post._id }">  
                    </ul>
                </div>
            </li>
        `);
    }
    let deletePost = function (deleteLink) {
        $(deleteLink).click(function (e) {
            e.preventDefault();
            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function (data) {
                    noty('error', 'post deleted :(')
                    $(`#post-${data.data.post_id}`).remove();
                },
                error: function (error) {
                    console.log(error.responseText);
                }
            });
        });
    }
    
    let convertToAjax = function () {
        // Iterate through each post in the list
        $('#posts-list-container>ul>li').each(function () {
            let self = $(this);
            
            // Check if the delete button is not already bound
            if (!$('.delete-post-button', self).data('events')) {
                // If not, bind the deletePost function to the delete button
                let deleteButton = $('.delete-post-button', self);
                deletePost(deleteButton);
            }
        });
    }
    
    convertToAjax();
    createPost();
    
}
