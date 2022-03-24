import brandUrl from '../img/JH.png';
const template = document.createElement("template");
template.innerHTML = `
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
    <nav class="navbar is-fixed-top is-dark">
    <div class="navbar-brand">
        <a class="navbar-item" href="./">
            <img src="${brandUrl}" alt="JH logo"></img>
        </a>
        <a role="button" class="navbar-burger " aria-label="menu" aria-expanded="false"
            data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </a>
    </div>
    <div id="navbarBasicExample" class="navbar-menu ">
        <div class="navbar-start">

            <a class="navbar-item is-tab " id="homeNav" href="./">
                Home
            </a>

            <hr class="navbar-divider">

            <a class="navbar-item is-tab " id="projNav" href="./projects.html">
                Projects
            </a>

            <hr class="navbar-divider">

            <a class="navbar-item is-tab " id="workNav" href="./work.html">
                Work
            </a>

            <hr class="navbar-divider">

            <a class="navbar-item is-tab " id="contactNav" href="./contact.html">
                Contact
            </a>

        </div>


    </div>
    </nav>
    
`;
class SiteNav extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });

        this.shadowRoot.appendChild(template.content.cloneNode(true));

        if (!this.dataset.active) this.dataset.active = "home";

    }
    connectedCallback() {
        this.render();
    }
    render() {
        const activePage = this.dataset.active;
        let activeEle = this.shadowRoot.querySelector(`#${activePage}Nav`);
        activeEle.classList.add("is-active");

        //Thanks bulma for the below!

        // Get all "navbar-burger" elements
        const $navbarBurgers = Array.prototype.slice.call(this.shadowRoot.querySelectorAll('.navbar-burger'), 0);

        // Check if there are any navbar burgers
        if ($navbarBurgers.length > 0) {

            // Add a click event on each of them
            $navbarBurgers.forEach(el => {
                el.addEventListener('click', () => {

                    // Get the target from the "data-target" attribute
                    const target = el.dataset.target;
                    const $target = this.shadowRoot.getElementById(target);

                    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                    el.classList.toggle('is-active');
                    $target.classList.toggle('is-active');

                });
            });
        }
        //end of bulma block
    }
}
export { SiteNav };