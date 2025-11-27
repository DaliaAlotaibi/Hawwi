/* validat Form Fields */
function validateFormFields(form) {
    var inputs = form.querySelectorAll("input, textarea, select");

    for (var i = 0; i < inputs.length; i++) {
        var field = inputs[i];

        if (field.type === "checkbox" || field.type === "radio") {
            continue;
        }

        if (field.value.trim() === "") {
            alert("Please fill all fields.");
            field.focus();
            return false;
        }
		
		if (form.classList.contains("course-form")) {
			if (field.id === "UploadImage" && field.value === "") {
				alert("Please upload an image.");
				return false;
			}
		}
    }
    return true;
}
/* validat Form Fields in about us */
function isTrue(form) {

    ///------------other----------
var inputs = form.querySelectorAll("input, textarea");
  for (var i = 0; i < inputs.length; i++) {
        var field = inputs[i];

        if (field.value.trim() === "") {
            alert(" Please fill all fields!!!.");
            field.focus();
            return false;
        }
    }



 let name=document.getElementById("fullName").value;
    let position=name.search(/[0-9]/);
//--------name-----------
 
if(position === 0){
alert("Name can not start with number!")
return false;
}

//------dOB---------------
let DoB=document.getElementById("dob").value;

 DoB= DoB.substring(0,4);
 let year= parseInt(DoB);

if(year>2008){
    alert("Sorry, you do not meet the minimum age requirement")
    return false;
}
//-------photo------
let Photo=document.getElementById("profilePhoto").value;

let testPhoto=Photo.substring(Photo.lastIndexOf(".")+1).toUpperCase() ;
if(testPhoto != "JPG" && testPhoto != "JPEG" && testPhoto != "WEBP" && testPhoto != "SVG" && testPhoto != "GIF" && testPhoto != "PNG" ){
    alert("Invalid imege type");
return false;
}

alert(name + " Your submission has successfully received")
return true;
}

/* Default static services */

var allServices = {
    "1": {
        category: "Art",
        img: "images/art.png",
        title: "Marsam Club",
        meta: "15 Oct 2025 | Jeddah | 1.5 hours",
        trainer: "Dalia Al-Otabibi",
        desc: "Empowers artists and hobbyists.",
        price: "85"
    },
    "2": {
        category: "Music",
        img: "images/music.jpg",
        title: "Saxophone Music Basics",
        meta: "14 Feb 2026 | Riyadh | 1 hour",
        trainer: "Fanar Barboud",
        desc: "Guided musical sessions.",
        price: "150"
    },
    "3": {
        category: "Fitness",
        img: "images/football.jpg",
        title: "Football Skills Clinic",
        meta: "15 Dec 2025 | Jeddah | 2 hours",
        trainer: "Wajd Al-Rashid",
        desc: "Safe football training.",
        price: "100"
    },
    "4": {
        category: "Cook",
        img: "images/cook.jpg",
        title: "Zadk",
        meta: "1 Jun 2026 | Abha | 4 hours",
        trainer: "Jumana Al-Hamoud",
        desc: "Creative cooking workshops.",
        price: "300"
    },
    "5": {
        category: "Technology",
        img: "images/pc.jpg",
        title: "Digital Skills Workshop",
        meta: "6 Aug 2026 | Taif | 1 hour",
        trainer: "Hamoud Al-Dhafiri",
        desc: "Hands-on digital skills.",
        price: "120"
    },
    "6": {
        category: "Photography",
        img: "images/photograph.jpg",
        title: "Photography Workshop",
        meta: "2 Aug 2026 | Riyadh | 2 hours",
        trainer: "Mohammed Al-Qahtani",
        desc: "Learn composition & lighting.",
        price: "170"
    }
};


/* Favorites list */
function getFavorites() {
    var list = localStorage.getItem("favorites");
    return list ? JSON.parse(list) : [];   
}

function saveFavorites(list) {
    localStorage.setItem("favorites", JSON.stringify(list));
}


// 3 - CARD BUILDERS (Static & Provider)
/* create Static Service Card */
function createStaticServiceCard(id, data) {
    var card = document.createElement("div");
    card.classList.add("service-card");
    card.dataset.id = id;

    card.innerHTML =
        '<button class="favorite-btn ">' +
            '<img src="images/heart.png" alt="favorite icon">' +
        '</button>' +
        '<div class="category">' + data.category + '</div>' +
        '<img src="' + data.img + '" alt="' + data.title + '">' +
        '<h3>' + data.title + '</h3>' +
        '<p class="meta">' +
            '<span>' + data.meta + '</span><br>' +
            'Trainer: ' + data.trainer +
        '</p>' +
        '<p class="description">' + data.desc + '</p>' +
        '<strong class="price">' + data.price + '</strong>';

    return card;
}

/* create Provider Service Card */
function createProviderServiceCard(id, s, includeFavorite) {
    var card = document.createElement("div");
    card.classList.add("service-card");
    card.dataset.id = id;

    var imgSrc = s.img ? "images/" + s.img : "images/placeholder.png";

    var favoritePart = "";
    if (includeFavorite) {
        favoritePart =
            '<button class="favorite-btn">' +
                '<img src="images/heart.png" alt="favorite icon">' +
            '</button>';
    }

    card.innerHTML =
        favoritePart +
        '<div class="category">' + (s.category || "General") + '</div>' +
        '<img src="' + imgSrc + '" alt="' + (s.name || "New Service") + '">' +
        '<h3>' + (s.name || "New Service") + '</h3>' +
        '<p class="meta">' +
            '<span>' + (s.date || "") + ' | ' +
                       (s.city || "") + ' | ' +
                       (s.duration || "") + ' hours</span><br>' +
            'Trainer: ' + (s.trainer || "Unknown") +
        '</p>' +
        '<p class="description">' + (s.desc || "") + '</p>' +
        '<strong class="price">' + (s.price || "") + '</strong>';

    return card;
}



document.addEventListener("DOMContentLoaded", function () {
	// VARIABLES
    var body          = document.body;
    var servicesGrid  = document.getElementById("services-grid");
    var favoritesGrid = document.getElementById("favorites-grid");
    var sortSelect    = document.getElementById("sort");

    // add new service Forms
    var addServiceForm =
        document.querySelector(".course-form") &&
        document.getElementById("courseName")
            ? document.querySelector(".course-form")
            : null;

    // Provider Dashboard elements
    var staffDeleteForm = document.querySelector(".delete-staff-form");
    var staffScroll     = document.querySelector(".staff-scroll");
    var staffAddForm    =
        staffDeleteForm ? document.querySelector(".course-form") : null;

    // 1 - PAGE DETECTION 
    var isServicesPage      = body.classList.contains("services-page") && servicesGrid && sortSelect;
    var isFavoritesPage     = !!favoritesGrid;
    var isProviderDashboard = body.classList.contains("dashboard") && servicesGrid && !staffDeleteForm;
    var isAddServicePage    = !!addServiceForm;
    var isManageStaffPage   = !!staffDeleteForm && !!staffScroll;
	/* === EXTRA PAGE SLOTS (For your extra pages) === */
	
	
    if (isServicesPage) console.log(" Services Page Loaded");
    if (isFavoritesPage) console.log(" Favorites Page Loaded");
    if (isProviderDashboard) console.log(" Provider Dashboard Loaded");
    if (isAddServicePage) console.log(" Add Service Page Loaded");
    if (isManageStaffPage) console.log(" Manage Staff Page Loaded");

	
	
    // favorite array 
    var favorites = getFavorites();


    // 4 - SERVICES PAGE — services.html
    if (isServicesPage) {

        // stitic card from html 
        var staticCards = Array.prototype.slice.call(
            servicesGrid.querySelectorAll(".service-card")
        );

        // card from localStorage
        var providerServices = JSON.parse(localStorage.getItem("providerServices")) || [];

        // card from provider
        var providerCards = [];
        for (var i = 0; i < providerServices.length; i++) {
            var service = providerServices[i];
            providerCards.push(createProviderServiceCard("p" + i, service, true));
        }

        // merge  providerCards + staticCards in on var
        var serviceCards = staticCards.concat(providerCards);

        // loop to display
        servicesGrid.innerHTML = "";
        for (i = 0; i < serviceCards.length; i++) {
            servicesGrid.appendChild(serviceCards[i]);
        }

        // random order 
		
        function shuffleCards() {
			//start from last card to first one 
            for (var k = serviceCards.length - 1; k > 0; k--) {
				//chose random number 
                var j = Math.floor(Math.random() * (k + 1));
				//swap
                var temp = serviceCards[k];
                serviceCards[k] = serviceCards[j];
                serviceCards[j] = temp;
            }
            servicesGrid.innerHTML = "";
			//display after reorder 
            for (var t = 0; t < serviceCards.length; t++) {
                servicesGrid.appendChild(serviceCards[t]);
            }
			console.log("Cards shuffled successfully");

        }
		
        shuffleCards();

        // Sorting
        sortSelect.addEventListener("change", function () {
            var val = sortSelect.value;

            if (val === "price-low-high") {
                serviceCards.sort(function (a, b) {
                    return parseInt(a.querySelector(".price").innerText) -
                           parseInt(b.querySelector(".price").innerText);
                });
            } else if (val === "price-high-low") {
                serviceCards.sort(function (a, b) {
                    return parseInt(b.querySelector(".price").innerText) -
                           parseInt(a.querySelector(".price").innerText);
                });
            } else if (val === "name-a-z") {
                serviceCards.sort(function (a, b) {
                    return a.querySelector("h3").innerText.toLowerCase()
                             .localeCompare(b.querySelector("h3").innerText.toLowerCase());
                });
            } else if (val === "name-z-a") {
                serviceCards.sort(function (a, b) {
                    return b.querySelector("h3").innerText.toLowerCase()
                             .localeCompare(a.querySelector("h3").innerText.toLowerCase());
                });
            }

            servicesGrid.innerHTML = "";
            for (var s = 0; s < serviceCards.length; s++) {
                servicesGrid.appendChild(serviceCards[s]);
            }
			console.log(" Sorting by: " + val);

        });

        // Favorites toggle
		// serviceCards including providerCards + staticCards 
        for (i = 0; i < serviceCards.length; i++) {
            (function (card) {
				//get card id and fav button
                var id  = card.dataset.id;
                var btn = card.querySelector(".favorite-btn");
                if (!btn) return;
				//color a click fav btn
                if (favorites.indexOf(id) !== -1) {
                    btn.classList.add("active");
                }
				// add and remove from favorite page
                btn.addEventListener("click", function () {
                    var idx = favorites.indexOf(id);
                    if (idx !== -1) {
                        favorites.splice(idx, 1);
                        btn.classList.remove("active");
                    } else {
                        favorites.push(id);
                        btn.classList.add("active");
                    }
                    saveFavorites(favorites);
                });
            })(serviceCards[i]);		
        }

    }


    // 5 -FAVORITES PAGE — favourite.html
    if (isFavoritesPage) {

        favorites = getFavorites();

        if (favorites.length === 0) {
            favoritesGrid.innerHTML =
                '<p class="empty-msg">No favorites added yet </p>';
        } else {
            var providerServicesFav =
                JSON.parse(localStorage.getItem("providerServices")) || [];

            function getCardById(id) {
                if (allServices[id]) {
                    return createStaticServiceCard(id, allServices[id]);
                }
                if (id && id.charAt(0) === "p") {
                    var index = parseInt(id.slice(1), 10);
                    var s = providerServicesFav[index];
                    if (!s) return null;
                    return createProviderServiceCard(id, s, true);
                }
                return null;
            }

            favoritesGrid.innerHTML = "";
			//display all fav card
            for (var f = 0; f < favorites.length; f++) {
                (function (id) {
                    var card = getCardById(id);
                    if (!card) return;
					//coloring the btn 
                    var btn = card.querySelector(".favorite-btn");
                    btn.classList.add("active");
					//unfav 
                    btn.addEventListener("click", function () {
                        var idx = favorites.indexOf(id);
                        if (idx !== -1) {
                            favorites.splice(idx, 1);
                        }
                        saveFavorites(favorites);
                        card.remove();
						//if no fav in list will display a massage 
                        if (favorites.length === 0) {
                            favoritesGrid.innerHTML =
                                '<p class="empty-msg">No favorites added yet </p>';
                        }
                    });

                    favoritesGrid.appendChild(card);
                })(favorites[f]);
            }
        }
		console.log(" Favorites Loaded:", favorites);

    }


    // 6 - PROVIDER DASHBOARD — provider.html
	//check if the page is PROVIDER DASHBOARD or not 
    if (isProviderDashboard) {

		// get all Service from localStorage thar add from add Service page 
        var providerServicesDash =
            JSON.parse(localStorage.getItem("providerServices")) || [];
		//if empty display a massage 
        if (providerServicesDash.length === 0) {
            servicesGrid.innerHTML =
                '<p class="empty-msg">No services added yet.</p>';
        } else {
			//crate new card and display it
            servicesGrid.innerHTML = "";
            for (var d = 0; d < providerServicesDash.length; d++) {
                var cardDash = createProviderServiceCard("p" + d, providerServicesDash[d], false);
                servicesGrid.appendChild(cardDash);
            }
        }
		
		
		  console.log(" Provider Dashboard Detected ");

			var providerServicesDash =
				JSON.parse(localStorage.getItem("providerServices")) || [];

			document.getElementById("totalServices").innerText =
				providerServicesDash.length;


    }


    // 7 - ADD SERVICE PAGE
	//check if the page is add-service or not 
    if (isAddServicePage) {

        addServiceForm.addEventListener("submit", function (e) {
            e.preventDefault();

            // check not empty 
            if (!validateFormFields(addServiceForm)) {
                return;
            }

            // read from form input 
            var nameInput      = document.getElementById("courseName");
            var priceInput     = document.getElementById("price");
            var dateInput      = document.getElementById("startDate");
            var durationInput  = document.getElementById("durationHours");
            var trainerInput   = document.getElementById("trainerName");
            var capacityInput  = document.getElementById("capacity");
            var citySelect     = document.getElementById("city");
            var categorySelect = document.getElementById("category");
            var descInput      = document.getElementById("description");
            var imgField       = document.getElementById("UploadImage");

            var nameValue     = nameInput.value.trim();
            var priceValue    = priceInput.value.trim();
            var dateValue     = dateInput.value.trim();
            var durationValue = durationInput.value.trim();
            var trainerValue  = trainerInput.value.trim();
            var capacityValue = capacityInput.value.trim();
            var cityValue     = citySelect.value.trim();
            var categoryValue = categorySelect.value.trim();
            var descValue     = descInput.value.trim();

            var imgName = "";
            if (imgField && imgField.value) {
                imgName = imgField.value.split("\\").pop();
            }

            // check validat name 
            if (!isNaN(nameValue.charAt(0))) {
                alert("Service name cannot start with a number.");
                return;
            }
			// check validat price 
            if (isNaN(priceValue)) {
                alert(" Price must be a number.");
                return;
            }

			//load old card and save new card 
            var providerServicesStore =
                JSON.parse(localStorage.getItem("providerServices")) || [];

            var newService = {
                name     : nameValue,
                price    : priceValue,
                date     : dateValue,
                duration : durationValue,
                trainer  : trainerValue,
                capacity : capacityValue,
                city     : cityValue,
                category : categoryValue,
                desc     : descValue,
                img      : imgName
            };

            providerServicesStore.push(newService);
			console.log("New Service Added:", newService);
            localStorage.setItem(
                "providerServices",
                JSON.stringify(providerServicesStore)
            );

            alert("Added successfully: " + nameValue);
            addServiceForm.reset();
        });
		
    }


    // 8 - MANAGE STAFF PAGE — manage-staff.html
	//check if the page is manage-staff or not 
    if (isManageStaffPage) {

        var defaultStaff = [
            { name:"Mohammed Al-Qahtani", field:"Photography", experience:"5 years", img:"mohammed.jpg" },
            { name:"Dalia Al-Otabibi",    field:"Art",         experience:"3 years", img:"Dalia.jpg"     },
            { name:"Fanar Barboud",       field:"Music",       experience:"7 years", img:"Fanar.jpg"     },
            { name:"Wajd Al-Rashid",      field:"Fitness",     experience:"1 years", img:"Wajd.jpg"      },
            { name:"Hamoud Al-Dhafiri",   field:"Technology",  experience:"9 years", img:"Hamoud.jpg"    },
            { name:"Jumana Al-Hamoud",    field:"Cook",        experience:"3 years", img:"Jumana.jpg"    }
        ];

        var staffList = JSON.parse(localStorage.getItem("staffList")) || defaultStaff;

        function renderStaff() {
            staffScroll.innerHTML = "";
            for (var i2 = 0; i2 < staffList.length; i2++) {
                var st = staffList[i2];

                var card = document.createElement("div");
                card.classList.add("staff-card");

                card.innerHTML =
                    '<input type="checkbox" name="delete-staff" value="' + st.name + '">' +
                    '<img src="images/' + st.img + '" alt="Staff Photo">' +
                    '<div class="staff-info">' +
                        '<span>' + st.name + '</span>' +
                        '<p class="meta">Field: ' + st.field +
                        '<br>Experience: ' + st.experience + '</p>' +
                        '<div class="stars">' +
                            '<img src="images/star.PNG" alt="star">' +
                            '<img src="images/star.PNG" alt="star">' +
                            '<img src="images/star.PNG" alt="star">' +
                            '<img src="images/star.PNG" alt="star">' +
                        '</div>' +
                    '</div>';

                staffScroll.appendChild(card);
            }
        }

        renderStaff();

        // delete staff 
        staffDeleteForm.addEventListener("submit", function (e) {
            e.preventDefault();

            var checked = document.querySelectorAll('input[name="delete-staff"]:checked');

            if (checked.length === 0) {
                alert("Please select at least one offer");
                return;
            }

            var ok = confirm("Are you sure you want to delete selected members?");
            if (!ok) return;

            var namesToDelete = [];
            for (var c = 0; c < checked.length; c++) {
                namesToDelete.push(checked[c].value);
            }

            staffList = staffList.filter(function (member) {
                return namesToDelete.indexOf(member.name) === -1;
            });
			console.log("Deleted staff:", namesToDelete);
            localStorage.setItem("staffList", JSON.stringify(staffList));
            renderStaff();

        });

        // add new staff 
        staffAddForm.addEventListener("submit", function (e) {
            e.preventDefault();

            // validat check input 
            if (!validateFormFields(staffAddForm)) {
                return;
            }

            var nameField        = document.getElementById("fullName");
            var emailField       = document.getElementById("email");
            var dobField         = document.getElementById("dob");
            var expertiseField   = document.getElementById("expertise");
            var skillsField      = document.getElementById("skills");
            var certificatesField= document.getElementById("certificates");
            var photoField       = document.getElementById("profilePhoto");

            var imgName = "";
            if (photoField && photoField.value) {
                imgName = photoField.value.split("\\").pop();
            }

            var newStaff = {
                name: nameField.value.trim(),
                field: expertiseField.value.trim(),
                experience: "1 year",
                img: imgName || "default.png"
            };

            staffList.push(newStaff);
			console.log(" Added new staff:", newStaff);
            localStorage.setItem("staffList", JSON.stringify(staffList));

            alert("Staff member added successfully!");
            staffAddForm.reset();
            renderStaff();
	

        });
    }
	
	
	// 9 -   Customer Dashboard 
	
var reqBtn = document.getElementById("goRequestBtn");
var evalBtn = document.getElementById("goEvaluateBtn");
var favBtn  = document.getElementById("goFavoritesBtn");

if (reqBtn) {
    reqBtn.addEventListener("click", function () {
        window.location.href = "Request-Service.html";
    });
}

if (evalBtn) {
    evalBtn.addEventListener("click", function () {
        window.location.href = "Evaluate-Service.html";
    });
}

if (favBtn) {
    favBtn.addEventListener("click", function () {
        window.location.href = "favorites.html";
    });
}
	
	
// 10- Request Service

var serviceIconMap = {
    "marsam-club": "images/Art-request service.png",
    "football-skills-clinic": "images/Football-request service.png",
    "zadk": "images/Cook-request service.png",
    "digital-skills-workshop": "images/Computer-request service.png",
    "saxophone-music-basics": "images/Saxophone-request service.png",
    "photograph-workshop": "images/Camera-request service.png"
};

var defaultServiceIcon = "images/Art-request service.png";

var requestForm = document.getElementById("request-service-form");
var requestBtn  = document.getElementById("requestBtn");

if (requestForm && requestBtn) {
    requestBtn.addEventListener("click", function (e) {
        e.preventDefault(); 

        var serviceSelect     = document.getElementById("service_select");
        var nameInput         = document.getElementById("customer_name");
        var dueDateInput      = document.getElementById("due_date");
        var descriptionInput  = document.getElementById("request_description");

        var serviceValue   = serviceSelect ? serviceSelect.value.trim() : "";
        var nameValue      = nameInput ? nameInput.value.trim() : "";
        var dueDateValue   = dueDateInput ? dueDateInput.value : "";
        var descriptionVal = descriptionInput ? descriptionInput.value.trim() : "";

        if (!nameValue) {
            alert("Please enter your full name.");
            if (nameInput) nameInput.focus();
            return;
        }

        var invalidChars = /[0-9?!@]/;

        if (!nameValue.includes(" ") || invalidChars.test(nameValue)) {
            alert("Please enter your full name without numbers or (?, !, @).");
            if (nameInput) nameInput.focus();
            return;
        }

        if (!serviceValue) {
            alert("Please select a service.");
            if (serviceSelect) serviceSelect.focus();
            return;
        }

        if (!dueDateValue) {
            alert("Please choose a due date for your request.");
            if (dueDateInput) dueDateInput.focus();
            return;
        }

        var today   = new Date();
        today.setHours(0, 0, 0, 0);

        var dueDate = new Date(dueDateValue);

        var diffTime = dueDate.getTime() - today.getTime();
        var diffDays = diffTime / (1000 * 60 * 60 * 24);

        if (diffDays < 0) {
            alert("The selected due date is in the past.\nPlease choose a valid future date.");
            if (dueDateInput) dueDateInput.focus();
            return;
        }

        if (diffDays < 7) {
            alert("The selected due date is too soon.\nPlease choose a later date to allow enough time for processing.");
            if (dueDateInput) dueDateInput.focus();
            return;
        }

        if (!descriptionVal) {
            alert("Please provide a brief description of your request.");
            if (descriptionInput) descriptionInput.focus();
            return;
        }

        if (descriptionVal.length < 100) {
            alert("Your description is too short.\nPlease provide more details (at least 100 characters).");
            if (descriptionInput) descriptionInput.focus();
            return;
        }

        var selectedServiceText = serviceSelect
            ? serviceSelect.options[serviceSelect.selectedIndex].text
            : serviceValue;

        var summaryMessage =
            "Thank you for submitting your request!\n\n" +
            "Customer name: " + nameValue + "\n" +
            "Service: " + selectedServiceText + "\n" +
            "Due date: " + dueDateValue + "\n\n" +
            "Do you want to stay on this page ? ";

        var stayOnPage = confirm(summaryMessage);

        if (stayOnPage) {
            var section = document.getElementById("newRequestsSection");
            var list    = document.getElementById("newRequestsList");

            if (section && list) {
                section.style.display = "block";

                var li = document.createElement("li");
                li.className = "request-card";

                var iconSrc = serviceIconMap[serviceValue] || defaultServiceIcon;
                var iconAlt = selectedServiceText + " icon";

                li.innerHTML =
                    '<div class="request-card-header">' +
                        '<div class="request-service-icon">' +
                            '<img src="' + iconSrc + '" alt="' + iconAlt + '">' +
                        '</div>' +
                        '<div class="request-service-name">' + selectedServiceText + '</div>' +
                    '</div>' +

                    '<div class="request-card-body">' +
                        '<div class="request-field">' +
                            '<span class="label">Customer:</span>' +
                            '<span class="value">' + nameValue + '</span>' +
                        '</div>' +

                        '<div class="request-field">' +
                            '<span class="label">Due date:</span>' +
                            '<span class="value">' + dueDateValue + '</span>' +
                        '</div>' +

                        '<div class="request-field">' +
                            '<span class="label">Description: </span>' +
                            '<p class="description-text">' + descriptionVal + '</p>' +
                        '</div>' +
                    '</div>';

                list.appendChild(li);
            }

            requestForm.reset();

        } else {
            window.location.href = "dashboard.html";
        }
    });
}


	
	
	// 11- Evaluate Service

	 var evalForm = document.getElementById("evaluate-service-form");

    if (evalForm) {
        console.log("Evaluate Service page detected");

        var evalBtn = document.getElementById("evaluateBtn");

               if (evalBtn) {
        evalBtn.addEventListener("click", function (e) {
            e.preventDefault(); 

            var nameInput = document.getElementById("customerName");
            var nameValue = nameInput ? nameInput.value.trim() : "";

            var serviceSelect = document.getElementById("serviceSelect");
            var serviceValue  = serviceSelect ? serviceSelect.value.trim() : "";

            var ratingInputs = document.querySelectorAll('input[name="rating"]');
            var ratingValue  = "";
            ratingInputs.forEach(function (radio) {
                if (radio.checked) {
                    ratingValue = radio.value;
                }
            });

            var feedbackInput = document.getElementById("feedback");
            var feedbackValue = feedbackInput ? feedbackInput.value.trim() : "";

           
            
            if (!nameValue) {
                alert("Please enter your full name.");
                if (nameInput) nameInput.focus();
                return;
            }

            var invalidChars = /[0-9?!@]/;
            if (!nameValue.includes(" ") || invalidChars.test(nameValue)) {
                alert("Please enter your full name without numbers or (?, !, @).");
                if (nameInput) nameInput.focus();
                return;
            }

    
            
            if (!serviceValue) {
                alert("Please select the service you want to evaluate.");
                if (serviceSelect) serviceSelect.focus();
                return;
            }

            
            if (!ratingValue) {
                alert("Please select a service rating.");
                return;
            }

            
            if (!feedbackValue) {
                alert("Please write your feedback about the service.");
                if (feedbackInput) feedbackInput.focus();
                return;
            }

            if (feedbackValue.length < 50) {
                alert("Your feedback is too short.\nPlease provide at least 50 characters.");
                if (feedbackInput) feedbackInput.focus();
                return;
            }

			var selectedServiceText = serviceSelect
				? serviceSelect.options[serviceSelect.selectedIndex].text
					: serviceValue;

	var shortFeedback = feedbackValue;
	if (shortFeedback.length > 120) {
		shortFeedback = shortFeedback.substring(0, 120) + "...";
	}

	var ratingNumber = parseInt(ratingValue.trim(), 10);

	var moodMessage = "";

	if (ratingNumber <= 2) {
		moodMessage =
			"We sincerely apologize for your experience. " +
			"Your feedback is very important to us, and we will work on improving this service.";
	}
	else if (ratingNumber === 3) {
		moodMessage =
			"Thank you for your honest feedback. We truly appreciate your input and will use it to improve our services.";
	}
	else {
		moodMessage =
			"Thank you so much for your positive rating! We are happy to know that the service met your expectations.";
	}

	var summaryMessage =
		moodMessage + "\n\n" +
		"Customer name: " + nameValue + "\n" +
		"Service: " + selectedServiceText + "\n" +
		"Rating: " + ratingNumber + " / 5\n" +
		"Feedback: " + shortFeedback + "\n\n" +
		"Press OK to return to your dashboard.";

	alert(summaryMessage);

	window.location.href = "dashboard.html";
			});
		}

		}


	// About us

	
	
	
	
	
	
	
	
	
	
	
	
	// 12 - THEME, BACK-TO-TOP, REVEAL, MODAL 
	
	// THEME TOGGLE (Light / Dark with images)
	const themeToggle = document.getElementById("themeToggle");
	const savedTheme  = localStorage.getItem("theme");

	// applay dark theme 
	if (savedTheme === "dark") {
		body.classList.add("dark-mode");
	}

	if (themeToggle) {
		themeToggle.addEventListener("click", () => {
			body.classList.toggle("dark-mode");
			const isDark = body.classList.contains("dark-mode");
			localStorage.setItem("theme", isDark ? "dark" : "light");
		});
	}
	
	// BACK TO TOP BUTTON 
	const backToTopBtn = document.getElementById("backToTopBtn");

	function handleScrollForTopBtn() {
		if (!backToTopBtn) return;
			if (window.scrollY > 300) {
			backToTopBtn.classList.add("show");
		} else {
		  backToTopBtn.classList.remove("show");
		}
	}

	if (backToTopBtn) {
		backToTopBtn.addEventListener("click", () => {
			window.scrollTo({
				top: 0,
				behavior: "smooth",
		});
		});

		window.addEventListener("scroll", handleScrollForTopBtn);
		handleScrollForTopBtn();
	}
	
	
	// REVEAL ON SCROLL (.reveal) 
	const revealElements = document.querySelectorAll(".reveal");

	function handleReveal() {
		const windowHeight = window.innerHeight;
		revealElements.forEach((el) => {
			const rect = el.getBoundingClientRect();
			if (rect.top < windowHeight - 80) {
				el.classList.add("show");
			}
		});
	}

	if (revealElements.length > 0) {
		window.addEventListener("scroll", handleReveal);
		handleReveal();
	}
	
	//WEEKLY CHALLENGE POPUP (Join Now)
	const joinBtn = document.querySelector(".join-challenge-btn");
    const modal = document.getElementById("challengeModal");
	const closeBtn = modal ? modal.querySelector(".modal-close") : null;
	const challengeForm = document.getElementById("challengeForm");
	const thankYouMsg = document.getElementById("challengeThankYou");

	function openModal() {
		if (!modal)
			return;
		modal.classList.add("show");
		modal.setAttribute("aria-hidden", "false");
	}

	function closeModal() {
		if (!modal)
			return;
		modal.classList.remove("show");
		modal.setAttribute("aria-hidden", "true");
	}

	if (joinBtn && modal) {
		joinBtn.addEventListener("click", openModal);
	}

	if (closeBtn) {
		closeBtn.addEventListener("click", closeModal);
	}

	if (modal) {
		// close when clicl on background
		modal.addEventListener("click", (e) => {
			if (e.target === modal) {
				closeModal();
			}
		});
	}

	if (challengeForm && thankYouMsg) {
		challengeForm.addEventListener("submit", function (e) {
			e.preventDefault();
			challengeForm.style.display = "none";
			thankYouMsg.hidden = false;
		});
	}
	
	
	// 11 - REAL-TIME CLOCK
	function updateTime() {
		const timer = document.getElementById("realTime");
		if (!timer) return;

		const now = new Date();
		timer.textContent = now.toLocaleString('en-SA', {
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit"
		});
	}

	setInterval(updateTime, 1000);
	updateTime();

	

	
	
	
	
	
	
});