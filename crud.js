const title = document.getElementById("title");
const desc = document.getElementById("desc");
const url = document.getElementById("url");
const img = document.getElementById("img");
const imgAlt = document.getElementById("img-alt");

const editButton = document.getElementById("edit-button");
const createButton = document.getElementById("create-button");
const deleteButton = document.getElementById("delete-button");

const form = document.getElementById("crud-form");
const projectDropdown = document.getElementById("project-select");
const projectList = document.getElementById("project-list");
const output = document.getElementById("crud-output");

let localProjects = JSON.parse(localStorage.getItem("localProjects")) || [];

// Reload the project dropdown list
function reloadProjectList() {
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

// Reload form field states based on dropdown selection and/or default projects
function reloadFormFieldStates() {
    const isCreate = projectDropdown.value === "create";
    
    // Set button states
    editButton.disabled = isCreate;
    editButton.style.backgroundColor = isCreate ? "gray" : "";
    deleteButton.disabled = isCreate;
    deleteButton.style.backgroundColor = isCreate ? "gray" : "";
    createButton.disabled = !isCreate;
    createButton.style.backgroundColor = isCreate ? "" : "gray";

    // Populate form fields if a project is selected
    if (isCreate) {
        form.reset();
    }
    else {
        const project = localProjects[projectDropdown.value];
        title.value = project.title;
        desc.value = project.desc;
        url.value = project.url;
        img.value = project.img;
        imgAlt.value = project.alt;
    }

    // Set readonly states for default projects
    if (!isCreate) {
        const project = localProjects[projectDropdown.value];
        const isDefault = project.default === "yes";
        img.toggleAttribute("readonly", isDefault);   
        img.style.backgroundColor = isDefault ? "lightgray" : "";
        url.toggleAttribute("readonly", isDefault);
        url.style.backgroundColor = isDefault ? "lightgray" : "";
        output.value = isDefault ? "Note: Default projects have read-only image and URL fields.": "";
    } else {
        img.removeAttribute("readonly");
        img.style.backgroundColor = "";
        url.removeAttribute("readonly");
        url.style.backgroundColor = "";
        output.value = "";
    }

}

document.addEventListener("DOMContentLoaded", () => {
    reloadProjectList();
    reloadFormFieldStates();
});

projectDropdown.addEventListener("change", () => {
    reloadFormFieldStates();
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
        localProjects.push(newProject);

        localStorage.setItem("localProjects", JSON.stringify(localProjects));
        form.reset();
        reloadFormFieldStates();
        output.value = "Project created successfully.";
        setTimeout(() => {output.value = "";}, 1500);
        reloadProjectList();

    } else if (action === "edit") {
        const project = localProjects[projectDropdown.value];

        // Check for no changes
        if (project.title === formData.get("title") &&
            project.desc === formData.get("desc") &&
            project.url === formData.get("url") &&
            project.img === formData.get("img") &&
            project.alt === formData.get("img-alt")) 
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
        reloadFormFieldStates();
        output.value = "Project edited successfully.";
        setTimeout(() => {output.value = "";}, 1500);
        reloadProjectList();

    } else if (action === "delete") {
        const index = projectDropdown.value;

        localProjects.splice(index, 1);

        localStorage.setItem("localProjects", JSON.stringify(localProjects));
        form.reset();
        reloadFormFieldStates();
        output.value = "Project deleted successfully.";
        setTimeout(() => {output.value = "";}, 1500);
        reloadProjectList();
    }
});
