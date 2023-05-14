async function createBlog(event) {
    event.preventDefault();

    const title = document.getElementById('blog-blog_title').value.trim();
    const desc = document.getElementById('blog-desc').value.trim();

    if (title && desc) {
        try {
            const response = await fetch('/api/blogs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ blog_title: title, description: desc })
            });

            if (!response.ok) {
                throw new Error('Failed to create blog');
            }

            window.location.assign('/profile');
        } catch (error) {
            alert(error.message);
        }
    }
}

async function deleteBlog(event) {
    if (!event.target.hasAttribute('data-id')) return;

    const id = event.target.getAttribute('data-id');

    try {
        const response = await fetch(`/api/blogs/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Failed to delete blog');
        }

        window.location.assign('/profile');
    } catch (error) {
        alert(error.message);
    }
}

document.querySelector('.new-blog-form').addEventListener('submit', createBlog);
document.querySelector('.blog-list').addEventListener('click', deleteBlog);
