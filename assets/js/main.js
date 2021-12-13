window.__forceSmoothScrollPolyfill__ = true;
window.onload = downloadProjects;

const myJson = new Request('https://gist.githubusercontent.com/nanofuxion/0287ade15065e416e4354ce39dd7cb05/raw/9963f7dd8ea28fbbbee5b909eac9e94a3a5aab1b/portfolio.json');
let projects = "";

// window.onhashchange = function() { 
//     //scroll if still on main page 
//     afterAdd();
// }

// function afterAdd() {
//     //check if #url is used and scroll page
// my

// }

const template = (e) =>
`<div
class="grid grid-cols-1 sm:col-span-1 md:col-span-2 lg:col-span-1 col-span-4 bg-indigo-900 py-3 px-3 rounded-lg border-4 hover:border-indigo-500 border-indigo-900">
    <a href="${e.url}">
        <div class="col-span-1 items-center my-auto">
            <img class=" my-2 rounded-lg" src="${e.img}">
        </div>
        <div class="col-span-1 px-2 items-center my-auto">
            <h1 class="lg:text-3xl text-lg font-bold ">${e.name}</h1>
            <p class="lg:text-lg text-xl">
                ${e.p}
            </p>
        </div>
    </a>
</div>`

function downloadProjects() {
    let projectsDiv = document.getElementById("mainContainer");
    fetch(myJson)
        .then(response => response.json())
        .then(data => {
            console.log(Object.keys(data.projects).length);
            for (let i = 0; i < Object.keys(data.projects).length; i++) {
                const element = data.projects[i];
                let newProj = template(element);
                
                projectsDiv.insertAdjacentHTML("beforeend", newProj);
            }
        });

}