




function animateCounter(element, target, duration) {
  let current = 0; 
  let increment = target / (duration / 20); 

  let timer = setInterval(function() {
    current = current + increment; 

    if (current >= target) {
      current = target;
      clearInterval(timer);
    }

    if (current >= 1000) {
      element.textContent = (current / 1000).toFixed(1) + 'k';
    } else {
      element.textContent = Math.floor(current);
    }

  }, 16);
}

let userCountEl = document.getElementById('userCount');
animateCounter(userCountEl, 19700, 3000);








let waitlistForm = document.getElementById('waitlistForm');
let nameInput = document.getElementById('nameInput');
let emailInput = document.getElementById('emailInput');
let errorMsg = document.getElementById('errorMsg');
let membersList = document.getElementById('membersList');
let totalCount = document.getElementById('totalCount');

let members = [];

let startMembers = [
  { name: 'Yacine B.', email: 'y***@gmail.com', time: '3 min ago' },
  { name: 'Amira K.', email: 'a***@yahoo.fr', time: '7 min ago' },
  { name: 'Mohamed L.', email: 'm***@hotmail.com', time: '15 min ago' },
];

startMembers.forEach(function(member) {
  addMemberToPage(member);
});

updateCount();


function isEmailValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function hideEmail(email) {
  let parts = email.split('@');
  return parts[0][0] + '***@' + parts[1];
}

function addMemberToPage(member) {
  let initials = member.name.split(' ').map(function(word) {
    return word[0];
  }).join('').toUpperCase();

  let item = document.createElement('div');
  item.classList.add('member-item');

  item.innerHTML =
    '<div class="member-avatar">' + initials + '</div>' +
    '<div class="member-info">' +
      '<span class="member-name">' + member.name + '</span>' +
      '<span class="member-email">' + member.email + '</span>' +
    '</div>' +
    '<span class="member-time">' + member.time + '</span>';

  membersList.insertBefore(item, membersList.firstChild);

  let allItems = membersList.querySelectorAll('.member-item');
  if (allItems.length > 5) {
    membersList.removeChild(allItems[allItems.length - 1]);
  }
}

function updateCount() {
  let total = 18700 + members.length;
  totalCount.textContent = (total / 1000).toFixed(1) + 'k members';
}

waitlistForm.addEventListener('submit', function(e) {
  e.preventDefault();

  let name = nameInput.value.trim(); 
  let email = emailInput.value.trim();


  if (name === '' && email === '') {
    errorMsg.textContent = 'Please fill in your name and email.';
    return;
  }

  if (name === '') {
    errorMsg.textContent = 'Please enter your name.';
    return;
  }

  if (email === '') {
    errorMsg.textContent = 'Please enter your email.';
    return;
  }

  if (!isEmailValid(email)) {
    errorMsg.textContent = 'Please enter a valid email (ex: name@gmail.com).';
    return;
  }

  let alreadyIn = members.find(function(m) {
    return m.rawEmail === email;
  });
  if (alreadyIn) {
    errorMsg.textContent = 'This email is already on the waitlist!';
    return;
  }

  errorMsg.textContent = ''; 

  let newMember = {
    name: name,
    email: hideEmail(email),
    rawEmail: email,
    time: 'just now'
  };

  members.push(newMember); 
  addMemberToPage(newMember); 
  updateCount(); 
  animateCounter(userCountEl, 18700 + members.length, 800); 

  
  nameInput.value = '';
  emailInput.value = '';

  
  let submitBtn = waitlistForm.querySelector('button[type="submit"]');
  submitBtn.textContent = "✅ You're on the list!";
  submitBtn.style.backgroundColor = '#00c67a';
  submitBtn.style.color = 'white';

  setTimeout(function() {
    submitBtn.textContent = 'Join Waitlist 🚀';
    submitBtn.style.backgroundColor = '';
    submitBtn.style.color = '';
  }, 3000);

});


nameInput.addEventListener('input', function() {
  errorMsg.textContent = '';
});
emailInput.addEventListener('input', function() {
  errorMsg.textContent = '';
});