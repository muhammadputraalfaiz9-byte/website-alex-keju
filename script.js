const nameInput = document.getElementById("comment-name");
const commentInput = document.getElementById("comment-text");
const submitButton = document.getElementById("comment-submit");
const commentList = document.getElementById("comment-list");

let comments = JSON.parse(localStorage.getItem("alexComments")) || [];


function saveComments() {
    localStorage.setItem("alexComments", JSON.stringify(comments));
}


function showComments() {

    commentList.innerHTML = "";

    if (comments.length === 0) {
        commentList.innerHTML = `
            <div class="no-comments">
                Belum ada komentar.
            </div>
        `;

        return;
    }


    comments.forEach(function(comment) {

        const commentItem = document.createElement("div");

        commentItem.className = "comment-item";


        commentItem.innerHTML = `
            <div class="comment-top">

                <div class="comment-name">
                    ${escapeHTML(comment.name)}
                </div>

                <div class="comment-date">
                    ${comment.date}
                </div>

            </div>


            <div class="comment-text">
                ${escapeHTML(comment.text)}
            </div>


            <button
                class="like-button ${comment.liked ? "liked" : ""}"
                data-id="${comment.id}"
            >
                <span>❤️</span>
                <span>${comment.likes}</span>
            </button>
        `;


        const likeButton =
            commentItem.querySelector(".like-button");


        likeButton.addEventListener("click", function() {

            comment.liked = !comment.liked;

            if (comment.liked) {
                comment.likes++;
            } else {
                comment.likes--;
            }

            saveComments();
            showComments();

        });


        commentList.appendChild(commentItem);

    });

}


function addComment() {

    const name = nameInput.value.trim();
    const text = commentInput.value.trim();


    if (name === "" || text === "") {

        alert("Nama dan komentar harus diisi.");

        return;
    }


    const newComment = {

        id: Date.now(),

        name: name,

        text: text,

        likes: 0,

        liked: false,

        date: new Date().toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric"
        })

    };


    comments.unshift(newComment);

    saveComments();

    showComments();


    nameInput.value = "";
    commentInput.value = "";

}


submitButton.addEventListener("click", addComment);


commentInput.addEventListener("keydown", function(event) {

    if (event.ctrlKey && event.key === "Enter") {
        addComment();
    }

});


function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


showComments();
