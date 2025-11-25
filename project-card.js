// Part 1: project-card element

class projectCard extends HTMLElement {
    
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

    }
    
    connectedCallback() {
        const title = this.getAttribute("title") || "";
        const desc = this.getAttribute("desc") || "";
        const url = this.getAttribute("url") || "#";
        const img = this.getAttribute("img") || "";
        const img600 = this.getAttribute("img600") || "";
        const img1200 = this.getAttribute("img1200") || "";
        const img2000 = this.getAttribute("img2000") || "";
        const alt = this.getAttribute("alt") || "";

        this.shadowRoot.innerHTML = `
            <style>
                .card {
                    width: 100%;
                    height: fit-content;
                    padding: 1rem 1rem 0.5rem;
                    display:flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    picture {
                        width: 100%;
                        max-width: 400px;
                        aspect-ratio: 4 / 3;
                        display: block;
                    }
                    picture img, svg {
                        object-fit: cover;
                        width: 100%;
                        height: 100%;
                        display: block;
                        aspect-ratio: 4/3;
                        border: var(--border-settings, 1px solid black);
                        border-radius: var(--border-radius, 0.5rem);
                    }
                    h2, p {
                        margin: 1rem 0rem 0rem;
                    }
                    a {
                        background-color: var(--heading-text-color, black);
                        text-decoration: none;
                        color: var(--background-color, white);
                        padding: 0.5rem;
                        margin-top: 1rem;
                        border-radius: var(--border-radius, 0.5rem);
                        &:hover{
                            background-color: var(--text-color-hover, black);
                        }
                        &:active {
                            background-color: var(--text-color-active, black);
                        }
                    }

                }
            </style>

            <article class="card">
                <picture>
                    <source srcset="${img600}" media="(max-width: 600px)" type="image/webp">
                    <source srcset="${img1200}" media="(max-width: 1200px)" type="image/webp">
                    <source srcset="${img2000}" type="image/webp">
                    <img src="${img}" alt="${alt}">
                </picture>

                <h2>${title}</h2>
                <p>${desc}</p>
                <a href="${url}">View More</a>
            </article>
        `;
    }
}

customElements.define("project-card", projectCard);

// Part 2: Local and remote buttons

const grid = document.getElementById("project-grid");
const loadLocalBtn = document.getElementById("load-local");
const loadRemoteBtn = document.getElementById("load-remote");

const localProjects = [
    {
        title: "DIY 3D Printer",
        desc: "Creating a fully featured CoreXY 3D printer completely from scratch.",
        url: "projects/duender.html",
        img: "/media/images/duender/duender.png",
        img600: "/media/images/duender/duender-600.webp",
        img1200: "/media/images/duender/duender-1200.webp",
        img2000: "/media/images/duender/duender-2000.webp",
        alt: "Screenshot of the Duender 3D printer"
    },
    {
        title: "The Odin Project",
        desc: "My experience working through The Odin Project's web dev curriculum.",
        url: "projects/odin.html",
        img: "/media/images/odin/odin.png",
        img600: "/media/images/odin/odin-600.webp",
        img1200: "/media/images/odin/odin-1200.webp",
        img2000: "/media/images/odin/odin-2000.webp",
        alt: "The Odin Project logo"
    },
    {                 
        title:"This Portfolio Site!",
        desc:"The very site you're on right now, built from scratch in HTML and CSS (no JS!)",
        url:"projects/portfolio.html",
        img:"/media/images/portfolio_thumbnail/portfolio_thumbnail.png",
        img600:"/media/images/portfolio_thumbnail/portfolio_thumbnail-600.webp",
        img1200:"/media/images/portfolio_thumbnail/portfolio_thumbnail-1200.webp",
        img2000:"/media/images/portfolio_thumbnail/portfolio_thumbnail-2000.webp",
        alt:"Picture of the code behind this portfolio site"
    }
];

localStorage.setItem("projects", JSON.stringify(localProjects));

function createCard(projectData) {
    const card = document.createElement("project-card");
    for (const attr in projectData) {
        card.setAttribute(attr, projectData[attr]);
    }
    return card;
}

loadLocalBtn.addEventListener("click", () => {
    grid.innerHTML = ""; // clear grid
    const localData = JSON.parse(localStorage.getItem("projects")) || [];
    localData.forEach(project => {
        const card = createCard(project);
        grid.appendChild(card);
    });
}); 

const remoteUrl = "https://api.jsonbin.io/v3/b/69261bded0ea881f40001095";
let projects = {};

loadRemoteBtn.addEventListener("click", async () => {
    grid.innerHTML = ""; // clear grid

    try {
        const response = await fetch(remoteUrl);
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        const jsonData = await response.json();
        const projects = jsonData.record || [];

        projects.forEach(key => {
            const card = createCard(key);
            grid.appendChild(card);
        });

    } catch (error) {
        console.error(error.message);
    }
});