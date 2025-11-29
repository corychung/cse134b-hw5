// Part 2: Local and remote buttons

const grid = document.getElementById("project-grid");
const loadLocalBtn = document.getElementById("load-local");
const loadRemoteBtn = document.getElementById("load-remote");
const restoreDefaultBtn = document.getElementById("restore-default");
const remoteUrl = "https://api.jsonbin.io/v3/b/69261bded0ea881f40001095";
let projects = [];

const localProjects = [
    {
        title: "DIY 3D Printer",
        desc: "Creating a fully featured CoreXY 3D printer completely from scratch.",
        url: "projects/duender.html",
        img: "/media/images/duender/duender.png",
        img600: "/media/images/duender/duender-600.webp",
        img1200: "/media/images/duender/duender-1200.webp",
        img2000: "/media/images/duender/duender-2000.webp",
        alt: "Screenshot of the Duender 3D printer",
        default: "yes"
    },
    {
        title: "The Odin Project",
        desc: "My experience working through The Odin Project's web dev curriculum.",
        url: "projects/odin.html",
        img: "/media/images/odin/odin.png",
        img600: "/media/images/odin/odin-600.webp",
        img1200: "/media/images/odin/odin-1200.webp",
        img2000: "/media/images/odin/odin-2000.webp",
        alt: "The Odin Project logo", 
        default: "yes"
    },
    {                 
        title:"This Portfolio Site!",
        desc:"The very site you're on right now, built from scratch in HTML and CSS (no JS!)",
        url:"projects/portfolio.html",
        img:"/media/images/portfolio_thumbnail/portfolio_thumbnail.png",
        img600:"/media/images/portfolio_thumbnail/portfolio_thumbnail-600.webp",
        img1200:"/media/images/portfolio_thumbnail/portfolio_thumbnail-1200.webp",
        img2000:"/media/images/portfolio_thumbnail/portfolio_thumbnail-2000.webp",
        alt:"Picture of the code behind this portfolio site",
        default: "yes"
    }
];

// Only set local storage once
if (!localStorage.getItem("localProjects")) {
    localStorage.setItem("localProjects", JSON.stringify(localProjects));
}

function createCard(project) {
    const card = document.createElement("project-card");
    for (const attr in project) {
        card.setAttribute(attr, project[attr]);
    }
    return card;
}

loadLocalBtn.addEventListener("click", () => {
    grid.innerHTML = ""; // clear grid
    projects = JSON.parse(localStorage.getItem("localProjects")) || [];

    projects.forEach(project => {
        const card = createCard(project);
        grid.appendChild(card);
    });
}); 

loadRemoteBtn.addEventListener("click", async () => {
    grid.innerHTML = ""; // clear grid
    try {
        const response = await fetch(remoteUrl);
        if (!response.ok) {
            throw new Error(response.status);
        }
        const jsonData = await response.json();
        projects = jsonData.record || [];

        projects.forEach(project => {
            const card = createCard(project);
            grid.appendChild(card);
        });

    } catch (error) {
        console.error(error.message);
    }
});

restoreDefaultBtn.addEventListener("click", () => {
    localStorage.setItem("localProjects", JSON.stringify(localProjects));
    grid.innerHTML = ""; // clear grid
    projects = JSON.parse(localStorage.getItem("localProjects")) || [];

    projects.forEach(project => {
        const card = createCard(project);
        grid.appendChild(card);
    });
});