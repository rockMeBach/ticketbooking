const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');

const movieSelect = document.getElementById('movie');

//+ to convert it to number
var ticketPrice = +movieSelect.value;

(function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('seatsIndex'));
    const movieIndex = localStorage.getItem('movieIndex');
    ticketPrice = localStorage.getItem('moviePrice');


    if(selectedSeats!==null && selectedSeats.length>0){
        seats.forEach(function(seat, index){
            if(selectedSeats.includes(index)){
                seat.classList.add('selected');
            }
        });
    }

    if(movieSelect.selectedIndex>-1){
        movieSelect.selectedIndex = movieIndex;
    }

    updateSelectedSeats();
})();

function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('movieIndex', movieIndex);
    localStorage.setItem('moviePrice', moviePrice);
}

function updateSelectedSeats(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...selectedSeats].map(function(seat){
        return [...seats].indexOf(seat);
    });

    localStorage.setItem('seatsIndex', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;
    count.innerHTML = selectedSeatsCount;
    total.innerHTML = ticketPrice*selectedSeatsCount;
}

movieSelect.addEventListener('change', function(e){
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedSeats();
});

container.addEventListener('click', function(e){
    const seat = e.target;
    if(seat.classList.contains('seat') && 
    !seat.classList.contains('occupied')){
        seat.classList.toggle('selected');
    }

    updateSelectedSeats();
});