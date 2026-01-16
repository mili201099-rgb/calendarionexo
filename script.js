const days = document.querySelectorAll('.day');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const mockupContainer = document.getElementById('mockupContainer');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentDayIndex = 0;

function openModal(index){
  const day = days[index];
  const dayNum = day.dataset.day || day.querySelector('.day-date')?.textContent || '';
  currentDayIndex = index;

  modalTitle.textContent = "Día " + dayNum;
  mockupContainer.innerHTML = "";

  if(day.dataset.mockups){
    const mockups = JSON.parse(day.dataset.mockups);
    mockups.forEach(m => {
      const card = document.createElement('div');
      card.classList.add('mockup-card');
      card.innerHTML = `<img src="${m.img}" alt="${m.type}"><p>${m.type}: ${m.desc}</p>`;
      mockupContainer.appendChild(card);
    });
  } else {
    mockupContainer.innerHTML = "<p>No hay publicaciones para este día.</p>";
  }

  modal.style.display = 'flex';
}

// Abrir modal al hacer clic en un día
days.forEach((day,index)=>{ day.addEventListener('click',()=> openModal(index)); });

// Cerrar modal
closeBtn.addEventListener('click', ()=> modal.style.display='none');
window.addEventListener('click', e => { if(e.target === modal) modal.style.display='none'; });

// Navegar entre días
prevBtn.addEventListener('click', ()=>{ let newIndex = currentDayIndex - 1; if(newIndex>=0) openModal(newIndex); });
nextBtn.addEventListener('click', ()=>{ let newIndex = currentDayIndex + 1; if(newIndex<days.length) openModal(newIndex); });
