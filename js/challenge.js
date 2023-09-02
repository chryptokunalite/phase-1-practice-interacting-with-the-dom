document.addEventListener("DOMContentLoaded", function () {
    const timer = document.getElementById("counter");
    const plusButton = document.getElementById("plus");
    const minusButton = document.getElementById("minus");
    const heartButton = document.getElementById("heart");
    const likedList = document.querySelector(".likes");
    const pauseButton = document.getElementById("pause");
    const submitButton = document.getElementById("submit");
    const commentForm = document.getElementById("comment-form");
    const commentInput = document.getElementById("comment-input");
    const commentList = document.getElementById("list")


    let seconds = 0;
    let likes = {};
    let intervalId
    let comments = {};

    const updateTimer = () => {
        timer.textContent = seconds
        seconds++;
    };


    intervalId = setInterval(updateTimer,1000);


    plusButton.addEventListener("click", () => {
        let currentCount = parseInt(timer.textContent);
        currentCount++
        timer.textContent = currentCount
    })

    minusButton.addEventListener("click", () => {
        let currentCount = parseInt(timer.textContent);
        currentCount--
        timer.textContent = currentCount
    })

    heartButton.addEventListener("click", () => {
        let currentCount = parseInt(timer.textContent);

        if (!likes[currentCount]) {
            likes[currentCount] = 1
        } else {
            likes[currentCount]++;
        }

        likedList.innerHTML = ""
 
        for (let count in likes) {
            const likeItem = document.createElement("li");
            likeItem.textContent = `${count} has been liked ${likes[count]} times.`;
            likedList.append(likeItem)
        }
    })
    const pauseTimer = () => {
        clearInterval(intervalId);
        plusButton.disabled = true;
        minusButton.disabled = true;
        submitButton.disabled = true;
        heartButton.disabled = true;
        pauseButton.textContent = "resume";
    }

    const resumeTimer = () => {
        clearInterval(intervalId)
        intervalId = setInterval(updateTimer, 1000);
        plusButton.disabled = false;
        minusButton.disabled = false;
        submitButton.disabled = false; 
        heartButton.disabled = false;
        pauseButton.textContent = "pause";
    }
     pauseButton.addEventListener("click", () => {
        if (pauseButton.textContent === "pause") {
            pauseTimer();
        } else {
            resumeTimer();
        }
     })

     const addComment = (event) => {
        event.preventDefault();

        const commentText = commentInput.value;

        const commentElement = document.createElement("p");
        commentElement.textContent = commentText;

        commentList.append(commentElement);

        commentInput.value = "";

     };

     commentForm.addEventListener("submit", addComment);

})


