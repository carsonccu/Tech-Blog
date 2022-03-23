const newFormHandler = async (event) => {
    event.preventDefault();

    const comment_content = document.querySelector('#comment-content').value;

    if (comment_content) {

        const response = await fetch(`/api/posts/comment`, {
            method: 'POST',
            body: JSON.stringify({ comment_content }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed');
        }
    }
};


document
    .querySelector('.new-comment-form')
    .addEventListener('submit', newFormHandler);