// Define colors object
const COLORS = {
  blue: "#25b0e4",
  pink: "#db518b",
  yellow: "#fdd041"
};

const BUTTON_BORDER = {
  blue: "#7ed0ef",
  pink: "#fa92be",
  yellow: "#ffeab2"
};

const BG_COLORS = {
  blue: "#e6f6fc",
  pink: "#ffdfec",
  yellow: "#fffaed"
};
//Define Image paths object
const IMG_PATHS = {
  blue: "./assets/Blue umbrella.png",
  pink: "./assets/Pink umbrella.png",
  yellow: "./assets/Yello umbrella.png"
};

// Get HTML dom elements
const radioGroup = document.getElementById("color-radio-group");
const radioBtn=document.getElementsByClassName("color-radio")
const pageContainer = document.getElementById("page-container");
const previewImage = document.getElementById("preview-image");
const uploadBtn = document.getElementById("upload-btn");
const fileInput = document.getElementById("file-input");
const uploadLogoText = document.getElementById("upload-logo-text");
const removeSelectedLogo = document.getElementById("remove-selected-logo");
const logoImg = document.getElementById("logo-img");
const uploadIcon = document.getElementById("upload-icon");
const loadingIconSmall = document.getElementById("loading-icon-small");
const previewDiv = document.getElementById("preview-div");
const loadingIconBig = document.getElementById("loading-icon-big");


// Loop through colors object and create radio buttons for each color
for (const color in COLORS) {
  // Create radio button element
  const radioButton = document.createElement("input");
  radioButton.type = "radio";
  radioButton.name = "color";
  radioButton.value = color;
  radioButton.id = color;
  radioButton.classList.add("color-radio");
  radioButton.style.backgroundColor = COLORS[color];

  //set blue color as default selected color
  if (color === "blue") {
    radioButton.checked = true;
    updatePage(color,radioButton);
  }

  //hnadle the color change 
  radioGroup.addEventListener('change', ()=>{
    
      if (radioButton.checked) {
          //update the page based on the selecter color
          updatePage(radioButton.value,radioButton);
      } else {
        radioButton.style.border = "";
      }

  });

  // Add radio button and label elements to radio group
  radioGroup.appendChild(radioButton);
}

//handle logo selection from files
uploadBtn.addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (file) {
    uploadIcon.style.display="none";
    loadingIconSmall.style.display="block"
    uploadLogoText.innerText = getFileName(file.name);
    removeSelectedLogo.style.display="block"
    const reader=new FileReader();
    reader.readAsDataURL(file);
    reader.onload=function(e){
        logoImg.src=e.target.result;
        logoImg.style.display="block"
     setTimeout(()=>{
        uploadIcon.style.display="block";
         loadingIconSmall.style.display="none"
     },500)   ;
    }
  }
});

//handle remove selected logo
removeSelectedLogo.addEventListener('click',(event)=>{
event.stopPropagation();
    fileInput.value="";
    uploadLogoText.innerText="Upload Logo";
    removeSelectedLogo.style.display="none";
            logoImg.src="";
            logoImg.style.display="none"

})
function getFileName (str) {
  if (str.length > 15) {
    return str.substr(0, 10) + '...' + str.substr(-5)
  }

  return str
}
  


// Function to update page with selected color
function updatePage(color,radioButton) {
  // Update loading icon
  loadingIconBig.style.fill = BUTTON_BORDER[color];
    previewDiv.style.display = "none";

  loadingIconBig.style.display = "block";
  
  // Update radio button border and page background color
  radioButton.style.border = `5px solid ${BUTTON_BORDER[color]}`;
  pageContainer.style.backgroundColor = BG_COLORS[color];
  
  // Hide preview image and display loading icon
  
  // Delay changing preview image source to show loading icon for short time
  setTimeout(() => {
    // Update preview image source and show preview image
      loadingIconBig.style.fill = "";
      loadingIconBig.style.display = "none";
      previewDiv.style.display = "block"; 
      
     // Hide loading icon and show preview image
    
      previewImage.src = IMG_PATHS[color];
      previewImage.style.opacity = 1;
      logoImg.style.opacity = 1;
    
    // Add transition effects
    previewImage.style.transition = "opacity 1s ease-in-out"; 
    logoImg.style.transition = "opacity 1s ease-in-out";
    
   
 
  }, 1000);

  // Update upload button background color and add transition effects
  uploadBtn.style.backgroundColor = COLORS[color];
  pageContainer.style.transition = "background-color 0.5s ease-in-out";
  radioButton.style.transition = "border-color 0.5s ease-in-out";
}