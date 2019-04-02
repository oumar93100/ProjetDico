class RechercheDico extends WidgetController {
	
	constructor() {
		super();
	}
	
	setUp() {
		super.setUp();
		

	}
	function getMot(){
             var mot = document.getElementById("mot").innerHTML;
}

	
	async load() {
		let result = await this.mvc.main.dom("https://www.larousse.fr/dictionnaires/francais/" + "mot"); // load web page
		let domstr = _atob(result.response.dom); // decode result
		let parser = new DOMParser(); // init dom parser
		let dom = parser.parseFromString(domstr, "text/html"); // inject result
		let article = new xph().doc(dom).ctx(dom).craft('//*[@id="en-continu"]/div/ul/li[1]/a').firstResult; // find interesting things
		this.mvc.view.update(article.textContent, article.getAttribute("href"));
	}
	
}
