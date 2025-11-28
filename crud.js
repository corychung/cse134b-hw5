const title = document.getElementById("title");
const desc = document.getElementById("desc");
const url = document.getElementById("url");
const img = document.getElementById("img");
const imgAlt = document.getElementById("img-alt");
const editButton = document.getElementById("edit-button");
const createButton = document.getElementById("create-button");
const deleteButton = document.getElementById("delete-button");
const projectDropdown = document.getElementById("project-select");
const projectList = document.getElementById("project-list");
const output = document.getElementById("crud-output");
const form = document.getElementById("crud-form");

let localProjects = JSON.parse(localStorage.getItem("localProjects")) || [];

function refreshProjectList() {
    projectList.innerHTML = "";
    if (localProjects.length == 0 || !localProjects) {
        let option = document.createElement("option");     
        option.value = "null";      
        option.textContent = "-- NO PROJECTS FOUND --";
        option.setAttribute("disabled", "true");
        projectList.appendChild(option);
    } else {
        localProjects.forEach((project, index) => {
            let option = document.createElement("option");
            option.value = index;            
            option.textContent = project.title;
            projectList.appendChild(option);
        });
    }
}

// Handle auto-fill for project selection
projectDropdown.addEventListener("change", () => {
    if (projectDropdown.value === "create") {
        form.reset();
        editButton.disabled = true;
        editButton.style.backgroundColor = "gray";
        deleteButton.disabled = true;
        deleteButton.style.backgroundColor = "gray";
        createButton.disabled = false;
        createButton.style.backgroundColor = "";
    }
    else {
        const project = localProjects[projectDropdown.value];
        document.getElementById("title").value = project.title;
        document.getElementById("desc").value = project.desc;
        document.getElementById("url").value = project.url;
        document.getElementById("img").value = project.img;
        document.getElementById("img-alt").value = project.alt;
        editButton.disabled = false;
        editButton.style.backgroundColor = "";
        deleteButton.disabled = false;
        deleteButton.style.backgroundColor = "";
        createButton.disabled = true;
        createButton.style.backgroundColor = "gray";

        if (localProjects[projectDropdown.value].default === "yes") {
            img.setAttribute("readonly", "true");   
            img.style.backgroundColor = "lightgray";
            url.setAttribute("readonly", "true");
            url.style.backgroundColor = "lightgray";
            output.value = "Note: Default projects have read-only image and URL fields.";
            return;
        }
    }
    img.removeAttribute("readonly");
    img.style.backgroundColor = "";
    url.removeAttribute("readonly");
    url.style.backgroundColor = "";
    output.value = "";
});

document.addEventListener("DOMContentLoaded", () => {
    refreshProjectList();
    editButton.disabled = true;
    editButton.style.backgroundColor = "gray";
    deleteButton.disabled = true;
    deleteButton.style.backgroundColor = "gray";
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form, event.submitter);
    const action = formData.get("action");

    if (action === "create") {
        const newProject = {    
            title: formData.get("title"),
            desc: formData.get("desc"),
            url: formData.get("url"),
            img: formData.get("img"), // image only since no upload capability
            img600: "", // prevent picture tag from choosing non-existent images
            img1200: "",
            img2000: "",
            alt: formData.get("img-alt"),
            default: "no"
        };
        form.reset();
        localProjects.push(newProject);
        localStorage.setItem("localProjects", JSON.stringify(localProjects));
        output.value = "Project created successfully.";
        setTimeout(() => {output.value = "";}, 1500);
        refreshProjectList();
    } else if (action === "edit") {
        const project = localProjects[projectDropdown.value];
        if (
            project.title === formData.get("title") &&
            project.desc === formData.get("desc") &&
            project.url === formData.get("url") &&
            project.img === formData.get("img") &&
            project.alt === formData.get("img-alt")
        ) 
        {
            output.value = "No changes detected to save.";
            setTimeout(() => {output.value = "";}, 1500);
            return;
        }

        project.title = formData.get("title");
        project.desc = formData.get("desc");
        project.url = formData.get("url");
        project.img = formData.get("img");
        project.alt = formData.get("img-alt");
        project.img600 = "";
        project.img1200 = "";
        project.img2000 = "";
        
        localStorage.setItem("localProjects", JSON.stringify(localProjects));
        form.reset();
        output.value = "Project edited successfully.";
        setTimeout(() => {output.value = "";}, 1500);
        refreshProjectList();

    } else if (action === "delete") {
        const index = projectDropdown.value;
        localProjects.splice(index, 1);
        localStorage.setItem("localProjects", JSON.stringify(localProjects));

        form.reset();
        output.value = "Project deleted successfully.";
        setTimeout(() => {output.value = "";}, 1500);

        refreshProjectList();
    }
});