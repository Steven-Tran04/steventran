function scrollTrigger(selector, options = {}){
    let els = document.querySelectorAll(selector)
    els = Array.from(els)
    els.forEach(el => {
        addObserver(el, options)
    })
}

function addObserver(el, options){
    if(!('IntersectionObserver' in window)){
        if(options.cb){
            options.cb(el)
        }else{
            entry.target.classList.add('active')
        }
        return
    }
    let observer = new IntersectionObserver((entries, observer) => { //this takes a callback function which receives two arguments: the elemts list and the observer instance
        entries.forEach(entry => {
            if(entry.isIntersecting){
                if(options.cb){
                    options.cb(el)
                }else{
                    entry.target.classList.add('active')
                }
                observer.unobserve(entry.target)
            }
        })
    }, options)
    observer.observe(el)
}
// Example usages:
scrollTrigger('.scroll-reveal', {
    rootMargin: '-200px',
})

// fetch and render projects section (implement later when actually have projects :')
// const projects = document.querySelector("#projects .contents")
// const renderProjects = async () => {
//     try {
//         const data = await fetch("data/projects.json");
//         const response = await data.json();
//         let item = "";
//         for (let i = 0; i < response.length; i++) {
//             item += `
//             <div class="product">
//              <img src=${response[i].thumbnail.url} alt=${response[i].name} />
//              <div class="text">
//               <h3>${response[i].name}</h3>
//               <a target="blank" href=${response[i].hoster_url} >View code on ${response[i].hoster_url}</a>
//               <a target="blank" href=${response[i].demo_url} >Demo</a>
//              </div>
//             </div>`
//         }
//         projects.innerHTML = item;
//     } catch {error} {
//         console.log("projects error ==>", error);
//     }
// };