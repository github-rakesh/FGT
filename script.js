document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Remove active class from all nav links
        document.querySelectorAll('nav ul li a').forEach(link => {
            link.classList.remove('active');
        });
        
        // Show the target section
        const targetId = this.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
        
        // Add active class to clicked nav link
        this.classList.add('active');
    });
});

//post
document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const post = this.closest('.post');
        
        if (this.classList.contains('like-btn')) {
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-regular');
            icon.classList.toggle('fa-solid');
        } else if (this.classList.contains('comment-btn')) {
            const commentBox = post.querySelector('.comment-box');
            commentBox.classList.toggle('visible');
        } else if (this.classList.contains('share-btn')) {
            const title = post.querySelector('h2').innerText;
            const text = post.querySelector('p').innerText;
            const url = window.location.href;

            if (navigator.share) {
                navigator.share({
                    title: title,
                    text: text,
                    url: url
                }).then(() => {
                    console.log('Post shared successfully');
                }).catch((error) => {
                    console.error('Error sharing post:', error);
                });
            } else {
                alert("Web Share API is not supported. Use the share links below.");
                const shareLinks = `
                    <div class="share-links">
                        <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}" target="_blank">Share on Facebook</a>
                        <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}" target="_blank">Share on Twitter</a>
                        <a href="https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}" target="_blank">Share on LinkedIn</a>
                    </div>
                `;
                post.insertAdjacentHTML('beforeend', shareLinks);
            }
        }
    });
});

// Handle comment submission
document.querySelectorAll('.submit-comment-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const commentBox = this.closest('.comment-box');
        const textarea = commentBox.querySelector('textarea');
        const commentText = textarea.value.trim();

        if (commentText !== "") {
            const commentsSection = this.closest('.post').querySelector('.comments-section');

            const newComment = document.createElement('div');
            newComment.classList.add('comment');
            newComment.innerHTML = `<p><strong>You:</strong> ${commentText}</p>`;

            commentsSection.appendChild(newComment);
            textarea.value = "";
            commentBox.classList.remove('visible'); 
        }
    });
});


