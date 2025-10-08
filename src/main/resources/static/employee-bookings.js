const MOCK_BOOKINGS = [
    {id: 101, activityName:'Minigolf', customerName:'Mads Dam', participants:8,
        startTime:'2025-10-08T14:00:00', endTime:'2025-10-08T15:30:00', status:'ACTIVE'},
    {id: 102, activityName:'Laser Tag', customerName:'Anna Jensen', participants:10,
        startTime:'2025-10-12T18:00:00', endTime:'2025-10-12T19:00:00', status:'PENDING'},
];

const tbody = document.getElementById('tbody');
const count = document.getElementById('count');
const empty = document.getElementById('empty');
const qInput = document.getElementById('q');

let view = 'all';
let query = '';

function isActive(b){
    return ['ACTIVE','PENDING'].includes((b.status||'').toUpperCase());
}
function parseDT(s){ return new Date(s); }
function isToday(d){
    const t=new Date();
    return d.getFullYear()===t.getFullYear() &&
        d.getMonth()===t.getMonth() &&
        d.getDate()===t.getDate();
}
function formatDT(dt){
    const d = new Date(dt);
    const pad = n => String(n).padStart(2,'0');
    return `${pad(d.getDate())}-${pad(d.getMonth()+1)}-${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
function formatT(dt){
    const d = new Date(dt);
    const pad = n => String(n).padStart(2,'0');
    return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function render(data){
    tbody.innerHTML = '';
    let shown = 0;
    data.forEach(b=>{
        const tr = document.createElement('tr');
        tr.innerHTML = `
      <td>${b.id}</td>
      <td>${formatDT(b.startTime)}</td>
      <td>${formatT(b.endTime)}</td>
      <td>${b.activityName}</td>
      <td>${b.customerName}</td>
      <td>${b.participants}</td>
      <td><span class="tag">${b.status}</span></td>
      <td><a class="btn" href="/employee/bookings/${b.id}">Detaljer</a></td>`;
        tbody.appendChild(tr);
        shown++;
    });
    count.textContent = shown;
    empty.style.display = shown ? 'none' : 'block';
}

function applyFilters(){
    let data = MOCK_BOOKINGS.filter(isActive);

    if(view==='today'){
        data = data.filter(b=>isToday(parseDT(b.startTime)));
    }

    const q = query.trim().toLowerCase();
    if(q){
        data = data.filter(b =>
            (b.activityName||'').toLowerCase().includes(q) ||
            (b.customerName||'').toLowerCase().includes(q)
        );
    }
    data.sort((a,b)=> parseDT(a.startTime)-parseDT(b.startTime));
    render(data);
}

document.querySelectorAll('[data-filter]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
        document.querySelectorAll('[data-filter]').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        view = btn.dataset.filter;
        applyFilters();
    });
});

document.getElementById('btnSearch').addEventListener('click', ()=>{
    query = qInput.value;
    applyFilters();
});
qInput.addEventListener('keydown', e=>{
    if(e.key==='Enter'){ query = qInput.value; applyFilters(); }
});

applyFilters();
