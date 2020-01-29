window.__forceSmoothScrollPolyfill__ = true;
window.onload = runStuff;

const myJson = new Request('https://gist.githubusercontent.com/nanofuxion/0287ade15065e416e4354ce39dd7cb05/raw/9963f7dd8ea28fbbbee5b909eac9e94a3a5aab1b/portfolio.json');


function PorjConst(pText, href, imgSrc) {
    imgSrc = imgSrc ? imgSrc : "./assets/images/cat.jpg";

    if (!new.target) {
        return new PorjConst(pText, href, imgSrc);
    }
    //create project div
    this.project = document.createElement("div");
    this.project.classList.add("my-2", "px-2", "w-full", "overflow-hidden", "md:w-1/3");
    this.projectInner = document.createElement("div");
    this.projectInner.classList.add("flex", "flex-wrap", "bg-gray-200", "p-4", "paper", "rounded-t-lg", "mb-6", "xl:h-56", "xl:text-sm", "text-xl");
    this.project.appendChild(this.projectInner);

    //create link container for the img and adding link
    let a = document.createElement("a");
    a.setAttribute("href", href);

    //create img
    this.projectImg = document.createElement("img");
    this.projectImg.classList.add("float-left", "mr-4", "my-2", "rounded-t-lg", "mb-4", "paper", "border-gray-400", "border-t", "border-l", "border-r", "lg:w-1/2", "h-20");

    this.projectImg.setAttribute("href", href);
    this.projectImg.src = imgSrc;

    //add img to link container
    a.appendChild(this.projectImg);


    this.projectPara = document.createElement("p");
    this.projectPara.classList.add("float-left", "xl:text-sm", "text-xl");
    this.projectPara.innerHTML = pText;
    this.projectInner.appendChild(a);
    this.projectInner.appendChild(this.projectPara);

    return this.project;
}

function addProjects() {
    let projectsDiv = document.querySelector(".projectsDiv");
    fetch(myJson)
        .then(response => response.json())
        .then(data => {
            console.log(Object.keys(data.projects).length);
            for (let i = 0; i < Object.keys(data.projects).length; i++) {
                const element = data.projects[i];
                console.log(data.projects[i]);
                let newProj = PorjConst(`<strong class="whitespace-no-wrap">${element.name}</strong> </br> ${element.p}`, element.url, element.img);
                projectsDiv.prepend(newProj);
                afterAdd();
            }
        });

}

function runStuff() {
    addProjects();
    contactFill();
}
window.onhashchange = function() { 
    //scroll if still on main page 
    afterAdd();
}

function afterAdd() {
    //check if #url is used and scroll page
    if (window.location.href.indexOf("#0portfolio") != -1){
        window.__forceSmoothScrollPolyfill__ = true;
        document.getElementById('portfolio').scrollIntoView({
            behavior: 'smooth'
        });
        // document.getElementById('portfolio').focus;
    }

}

function contactFill() {
    let blur = 0;

    //open email client with textarea value in body
    document.getElementById('bt1').onclick = function (event) {
        event.preventDefault();
        window.location.href = ('mailto:ramnadroj@gmail.com?subject=' +
            "Portfolio Page Contatct" + '&body=' + encodeURIComponent(document.getElementById('message').value.replace(/\n\r?/g, '<br />')));
    };

    //set cursor after prefill
    document.getElementById('message').addEventListener('focus', (event) => {
        if(document.getElementById('message').value == "") blur = 0;
        else blur += 1;
        setTimeout(function () { document.getElementById('message').setSelectionRange(-1, -1); }, 1);
    });

    //fill name in text area as typed in namebox unless taxt area is edited.
    let nameEvent = (event) => {
        if(document.getElementById('name').value == "" && blur == 0) setTimeout(function () { document.getElementById('message').value = ""; }, 1);
        if(document.getElementById('message').value == "") blur = 0;
        if (blur == 0 && document.getElementById('name').value != "")
        document.getElementById('message').value = `Hi Jordan, my name is ${document.getElementById('name').value[0].toUpperCase() + document.getElementById('name').value.slice(1)},\n\n`;
    }
    document.getElementById('name').addEventListener('input', nameEvent);
    document.getElementById('name').addEventListener('focus', nameEvent);
}