const revealButtons = document.querySelectorAll('.reveal-button');
const giftTextElements = document.querySelectorAll('.gift-text');
const memeElement = document.getElementById('meme-image');
const captionElement = document.getElementById('meme-caption');
const messageElement = document.getElementById('message');

revealButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    const coverId = button.getAttribute('data-cover-id');
    revealMeme(coverId, index);
  });
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function getMeme() {
  const response = await fetch('https://api.example.com/memes');
  const data = await response.json();
  return data;
}

async function revealMeme(coverId, index) {
  const coverElement = document.getElementById(`cover${coverId}`);
  coverElement.style.display = 'none';

  let message = '';
  let context = '';
  if (coverId === '1') {
    message = 'Bedankt voor de geweldige steun! Ik mis jullie allemaal en ik zal sneller terug zijn dan je denkt.';
    context = 'Jullie toewijding en zorg zijn onbetaalbaar. Ik kan niet wachten om jullie weer te zien!';
  } else if (coverId === '2') {
    message = 'Jullie zijn de beste!';
    context = 'Jullie professionaliteit en medeleven hebben een grote impact gehad. Bedankt!';
  } else if (coverId === '3') {
    message = 'Jullie zorg maakt het verschil!';
    context = 'Jullie expertise en vriendelijkheid hebben mijn hart geraakt. Ik ben dankbaar voor alles.';
  }
  messageElement.textContent = `${message} ${context}`;

  const memeData = await getMeme();
  memeElement.src = memeData.image;
  captionElement.textContent = memeData.caption;

  giftTextElements.forEach((textElement, textIndex) => {
    if (textIndex === index) {
      textElement.classList.remove('hidden');
    } else {
      textElement.classList.add('hidden');
    }
  });

  document.getElementById('meme').classList.remove('hidden');
}
