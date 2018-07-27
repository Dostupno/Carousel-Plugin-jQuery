jQuery.fn.Cave = function(option) {

	var Side, Wul,
		$ = jQuery, 
		t = this, 
		Wli = 206, 
		Block = $(option.elem),
		Wblock = ((Block.width() / Wli) ^ 0) * Wli,
		timeOut = 100;

	$(t).width(Wblock);

	$(t).each(function() {
		
		Wul = $("li", this).length * Wli;
		this.Eul = $("ul", this).width(Wul);

		$(this).on('touchstart pointerdown MSPointerDown', function(e) {
			swipeStart = e.originalEvent.pageX || e.originalEvent.touches[0].pageX;
		}).on('touchmove', function(e) {
			e.preventDefault();
			swipeEnd = e.originalEvent.pageX || e.originalEvent.touches[0].pageX;
			Side = swipeStart - swipeEnd;
		}).on('touchend touchcancel pointerup pointercancel MSPointerUp MSPointerCancel', function(e) {
			if (Side !== undefined) { // move to side
				if (Side >= 0) { // left
					if (Side > Wli) { // multi step	

						this.Side = ((Side / Wli) ^ 0) * Wli;
						this.pos  = this.Eul.position().left;
						
						if (this.Side < Wblock) {
							this.p = ~(this.pos - this.Side) + 1; // balanse between memory and cpu
							this.Eul.animate({left: this.p > Wul - Wblock ? -(Wul - Wblock) : -this.p}, timeOut);
						} else {
							this.p = Wul + (this.pos - Wblock);
							this.Eul.animate({left: this.p < Wblock ? (~this.p + 1) + this.pos : this.pos - Wblock}, timeOut); 
						}
						
					} else { // one step
						this.pos = this.Eul.position().left - Wli;
						if (Wul + this.pos == 0 || Wul + this.pos < Wblock) return;	// end elements
						this.Eul.animate({left: this.pos}, timeOut);  
					}
				} else { // right
					if (Side <= -Wli) { // multi step
					
						this.Side = ~(((Side / Wli) ^ 0) * Wli) + 1;
						this.pos  = this.Eul.position().left;
						
						if (this.Side < Wblock) {							
							this.Eul.animate({left: this.pos + this.Side < 0 ? this.pos + this.Side : 0}, timeOut);
						} else {
							this.Eul.animate({left: this.pos + Wblock > 0 ? 0 : this.pos + Wblock}, timeOut);
						}						
						
					} else { // one step
						this.pos = this.Eul.position().left;
						if (this.pos < 0)
							this.Eul.animate({left: this.pos + Wli}, timeOut);
					}
				}
			} else { // click
				//console.log('open photo or video');
			}
			Side = undefined;
		});
		
		$(this).prev().click(function(e){ // left click - prev
			this.Eul = $("ul", $(this).next());
			if (this.Eul.position().left < 0)
				this.Eul.stop(true, true).animate({left: this.Eul.position().left + Wblock > 0 ? 0 : this.Eul.position().left + Wblock}, timeOut); 
		});
		
		$(this).next().click(function(e){ // right click - next
			this.Eul = $("ul", $(this).prev());
			this.p = ~(Wul - Wblock) + 1;
			this.Eul.stop(true, true).animate({left: this.p >= this.Eul.position().left - Wblock ? this.p : this.Eul.position().left - Wblock}, timeOut);
		});
		
	});

	$(window).resize(function(){
		Wblock = ((Block.width() / Wli) ^ 0) * Wli;
		$(t).width(Wblock);
		$("ul", t).css("left", 0);
	});
	
}



/********************************************************************

addListenerMulti(this, 'touchstart pointerdown MSPointerDown', function(e) {
	console.log(e);
	swipeStart = e.pageX || e.touches[0].pageX;
});

addListenerMulti(this, 'touchmove', function(e) {
	swipeEnd = e.pageX || e.touches[0].pageX;
	Side = swipeStart - swipeEnd;
});
		
var supportsPassive = false;

try {
	var opts = Object.defineProperty({}, 'passive', {
		get: function() {
			supportsPassive = true;
		}
	});
	window.addEventListener("testPassive", null, opts);
	window.removeEventListener("testPassive", null, opts);
} catch (e) {}

function addListenerMulti(element, eventNames, listener) {
	var events = eventNames.split(' '), i, iLen = events.length;
	for (i = 0; i < iLen; i++) {
		element.addEventListener(events[i], listener, supportsPassive ? { passive: true } : false);
	}
}

function handleStart() {
	console.log("handleStart");
}

function handleEnd() {
	console.log("handleEnd");
}

function handleCancel() {
	console.log("handleCancel");
}

function handleMove(e) {
	console.log(e);
}

$("li", this).each(function(){
	this.addEventListener("touchstart", handleStart, false);
	this.addEventListener("touchend", handleEnd, false);
	this.addEventListener("touchcancel", handleCancel, false);
	this.addEventListener("touchmove", handleMove, false);		
});

*********************************************************************/