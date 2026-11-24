const pets = [
  { id: 1, name: "Buddy", type: "dog", breed: "Golden Retriever", age: "2 years", gender: "Male", image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=700&h=700&fit=crop" },
  { id: 2, name: "Luna", type: "cat", breed: "Domestic Shorthair", age: "1 year", gender: "Female", image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=700&h=700&fit=crop" },
  { id: 3, name: "Max", type: "dog", breed: "Beagle", age: "3 years", gender: "Male", image: "https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=700&h=700&fit=crop" },
  { id: 4, name: "Coco", type: "rabbit", breed: "Holland Lop", age: "8 months", gender: "Female", image: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=700&h=700&fit=crop" },
  { id: 5, name: "Milo", type: "cat", breed: "British Shorthair", age: "2 years", gender: "Male", image: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=700&h=700&fit=crop" },
  { id: 6, name: "Daisy", type: "dog", breed: "Border Collie", age: "4 years", gender: "Female", image: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=700&h=700&fit=crop" }
];

function petCard(pet, adoptPage = false) {
  return `
    <article class="pet-card">
      <img class="pet-photo" src="${pet.image}" alt="${pet.name}, ${pet.breed}">
      <div class="pet-info">
        <h3>${pet.name}</h3>
        <div class="pet-meta"><span>${pet.breed}</span><span>${pet.age}</span></div>
        ${adoptPage ? `<a class="adopt-btn" href="contact.html?pet=${encodeURIComponent(pet.name)}">Meet ${pet.name}</a>` : ""}
      </div>
    </article>`;
}

document.querySelector(".menu-toggle")?.addEventListener("click", (event) => {
  const nav = document.querySelector(".main-nav");
  nav.classList.toggle("open");
  event.currentTarget.setAttribute("aria-expanded", nav.classList.contains("open"));
});

const featured = document.querySelector("#featured-pets");
if (featured) featured.innerHTML = pets.slice(0, 4).map(pet => petCard(pet)).join("");

const adoptGrid = document.querySelector("#adopt-grid");
if (adoptGrid) {
  const params = new URLSearchParams(window.location.search);
  let filter = params.get("pet") || "all";
  const render = () => {
    const visible = filter === "all" ? pets : pets.filter(pet => pet.type === filter);
    adoptGrid.innerHTML = visible.map(pet => petCard(pet, true)).join("");
  };
  document.querySelectorAll(".filter-pill").forEach(button => {
    button.classList.toggle("active", button.dataset.filter === filter);
    button.addEventListener("click", () => {
      filter = button.dataset.filter;
      document.querySelectorAll(".filter-pill").forEach(pill => pill.classList.toggle("active", pill === button));
      render();
    });
  });
  render();
}

const petSelect = document.querySelector("#pet");
if (petSelect) {
  const petName = new URLSearchParams(window.location.search).get("pet");
  if (petName) petSelect.value = petName;
}

document.querySelector("#contact-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const status = event.currentTarget.querySelector(".form-status");
  status.textContent = "Thank you! Our adoption team will be in touch soon.";
  event.currentTarget.reset();
});
