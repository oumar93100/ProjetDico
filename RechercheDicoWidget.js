class RechercheDicoWidget extends Widget {
	
	constructor(id, app) {
		super(id, LeMondeModel, LeMondeView, LeMondeController, app);
	}
	
	setUp() {
		super.setUp();
		this.header = true;
		this.footer = true;
		this.sizeX = 2;
		this.sizeY = 1;
		this.radius = 15;
	}
	
	async ready() {
		super.ready();
		SocketIO.initialize();
		SocketIO.on("msg", this.mvc.controller.onMessage.bind(this));
		this.mvc.controller.load();
	}
	
}

class RechercheDicoModel extends WidgetModel {
	
	constructor() {
		super();
	}
	
	setUp() {
		super.setUp();
		
	}

}

class RechercheDicoView extends WidgetView {
	
	constructor() {
		super();
	}
	
	setUp() {
		super.setUp();
		
	}

	draw() {
		super.draw();
		this.link = HH.create("a");
		SS.style(this.link, {"fontSize": "10px", "textDecoration": "none"});
		this.stage.appendChild(this.link);
		
		this.try.footer.innerHTML = "test socket";
		SS.style(this.try.footer, {"userSelect": "none", "cursor": "pointer"});
		Events.on(this.try.footer, "click", event => this.mvc.controller.socketClick());
		this.try.stage.appendChild(this.try.footer);
	}
	
	update(title, link) {
		this.link.innerHTML = title;
		HH.attr(this.link, {"https://www.larousse.fr/dictionnaires/francais/" + "mot"});
	}
	
}

class RechercheDico extends WidgetController {
	
	constructor() {
		super();
	}
	
	setUp() {
		super.setUp();
		
	}
	
	onMessage(data) {
		trace("received socket msg", data);
	}
	
	socketClick(event) {
		trace("test socket");
		trace(window.Main.widgets);
		SocketIO.send("msg", {test: "message"});
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
