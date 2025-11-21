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