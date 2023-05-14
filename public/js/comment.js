async function processCommentSubmission(e) {
    e.preventDefault();

    const commentForm = document.querySelector('.comment-form');
    const commentText = document.querySelector('#comment-text').value.trim();
    const associatedBlogId = commentForm.getAttribute('data-blog-id');

    if (commentText) {
        console.log("Initiating comment post...");

        const commentResponse = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ 
                blog_id: associatedBlogId, 
                comment_description: commentText 
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log("Comment post completed...");

        if (commentResponse.ok) {
            location.reload();
        } else {
            throw new Error('Unable to post comment');
        }
    }
};

document
    .querySelector('.comment-form')
    .addEventListener('submit', processCommentSubmission);
