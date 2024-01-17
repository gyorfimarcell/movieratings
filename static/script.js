const container = document.getElementById("container");

let movies = [];

async function FetchMovies() {
    const resp = await fetch("api/movies/");
    const data = await resp.json();
    movies.push(...data);
    //movies.push(...data);
    //movies.push(...data);
}

async function Init() {
    await FetchMovies();
    for (const movie of movies) {
        container.appendChild(CreateMovie(movie));
    }

}

function CreateMovie(movie) {
    const parent = document.createElement("div");
    parent.className = "movie";

    const image = document.createElement("img");
    image.src = movie.poster_image;
    parent.appendChild(image);

    const title = document.createElement("h2");
    title.innerText = movie.title;
    parent.appendChild(title);

    const rating = document.createElement("h4");
    rating.innerText = `${movie.average_rating.toFixed(2)} / 5`;
    parent.appendChild(rating);

    const ratingBox = document.createElement("div");
    ratingBox.className = "ratings";
    for (let i = 1; i < 6; i++) {
        const star = document.createElement("span");
        star.className = "star";
        star.innerText = movie.average_rating >= i ? "★" : "☆";
        star.addEventListener("click", () => Vote(movie, i));
        ratingBox.appendChild(star);
    }
    parent.appendChild(ratingBox);

    return parent;
}

async function Vote(movie, rating) {
    const index = movies.indexOf(movie);

    const resp = await fetch("api/vote/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ movieId: movie.id, rating: rating })
    });
    const data = await resp.json();

    movies[index] = data;
    container.children[index].replaceWith(CreateMovie(movies[index]));
}

Init();