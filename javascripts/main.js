const discount = .12;

const applySale = () => {
    $('.on-sale').each((i, fish) => {
        const fullPrice = $(fish).find('.price'); //made fish into jquery
        const newPrice = (parseInt(fullPrice.html()) * (1 - discount)).toFixed(2);
        fullPrice.html(newPrice);
    })
};

// Add fish to "Basket"
//if else statement that returns a string. ? or : if it was false it would replace it with 'nothing' that came after the colon. or whatever comes after the colon, anyways. if it's true it returns the string/part that is true.
const writeFishes = (arrayOfFishes) => {
    let domString = '';
    arrayOfFishes.forEach((fish) => {
        domString += `
        <div class="${fish.onSale ? 'on-sale' : ''} fish card col-md-6 col-md-offset-3"> 
                <div class="thumbnail">
                    <img src="${fish.imageSoure}"
                        alt="" width="40%">
                    <div class="caption">
                            <h3 id="thumbnail-label">${fish.name}</h3>
                        <p>$
                            <span class="price">${fish.basePrice}</span>
                        </p>
                    </div>
                    <div class="caption card-footer">
                        <button class="add btn btn-danger">Add To Basket</button>
                    </div>
                </div>
            </div>
        `
    })
    // Write to the available div using a jQuery selector -- HTML will replace if I was to use .html; you would no longer have a button or the h1. 
    $("#available").append(domString);
    bindEvents();
};
//using .on because it's happening AFTER the page loads
const bindEvents = () => {
    $(".add").on('click', (e) => {
//what is the div that has the fish?  so if i click on a button, it has a fish div somewhere, so grabbing the button that has the fish associated with it.
    const fishToMove = $(e.target).closest('.fish');
//wanna take that fish and move it to the 'snagged' div
    $("#snagged").append(fishToMove);
//after done moving, take the button text and make it 'remove from basket' and change the class. take off 'add' and add a class of 'remove'
//.target because it's clicking on the button already
    $(e.target).text('Remove From Basket').addClass('remove').removeClass('add');
    //remove button
    $('.remove').on('click', (e) => {
        const fishToMove = $(e.target).closest('.fish');
        $('#available').append(fishToMove);
        $(e.target).text('Add To Basket').addClass('add').removeClass('class');
    })
    })

//another way of writing the above said function is like this: (but if this is how you write it, then you'd have to write the top one just like this one and both would have to be out of the event/function thingy)
//$('body').on('click'), 'button.remove', (e) => {
    //const fishToMove = $(e.target).closest('.fish');
    //$('#available').append(fishToMove);
    //$(e.target).text('Add To Basket').addClass('add').removeClass('remove);
//}
};

$("#show-sale").click(() => {
    //grab all of the divs with the class fish, give me just the ones without the class on-sale and HIDE them.
    $('.fish').not('.on-sale').toggle();
    $("#show-sale").text((i, text) => {
        if (text === 'Show Sale Fish') {
            return 'Show All Fish'
        } else {
            return 'Show Sale Fish';
        }
    })
});


// Load fish
$.get('../db/fishes.json')
    .done((data) => {
     console.log(data);
     writeFishes(data.fishes);//data is fishes in the json; fishes brings back that key; will run on page load write fishes
     applySale();
 })
    .fail((error) => {
     console.log(error)
});




