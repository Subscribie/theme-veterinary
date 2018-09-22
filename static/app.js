document.addEventListener('DOMContentLoaded', subscribieInit);


function subscribieInit(e) {
  Subscribie.controlIndexCount['title'] = 0;
  Subscribie.controlIndexCount['image'] = 0;
  Subscribie.controlIndexCount['subscription'] = 0;
  Subscribie.controlIndexCount['monthly_price'] = 0;
  Subscribie.controlIndexCount['instant_payment'] = 0;
  Subscribie.controlIndexCount['sell_price'] = 0;
  Subscribie.controlIndexCount['selling_points'] = {maxPerGroup:3, currentIndex:'0-2'};
  console.log("subscribieInit ready.");
  Subscribie.showBuildingSite();
  Subscribie.cloneItemFormGroup();
  
}

Subscribie = {
    showBuildingSite: function() {
      try {
          form = document.getElementById('items');
          form.addEventListener('submit', function(e){
              btn = document.getElementById('submit-start-building');
              btn.value = 'Please wait, building your site..';
              btn.disabled = true;
          });
      } catch (e) {
          console.error(e);
      }
    },
    cloneItemFormGroup: function() {
      cloneBtn = document.getElementsByClassName('clone')[0];
      cloneBtn.addEventListener('click', function() {
          //Clone listener
          const cloneItem = document.getElementsByClassName('clone')[0];
          const target = cloneItem.dataset.target;
          const cloneTarget = document.getElementsByClassName(target)[0];
          let cloned = cloneTarget.cloneNode(true);
          /* Update element indexes */
          // Get all form groups 
          let formGroups = document.querySelectorAll('[data-formGroupName]');
          for (let formGroup of formGroups)
          {
            /* Get all input within each form group and update their indexes,
             * accounting for multidimensional inputs 
            */
            // Get number formGroups with same name to determine index
            query = "[data-formGroupName=" + formGroup.dataset.formgroupname + "]";
            let formGroupIndex = document.querySelectorAll(query).length + 1;
            let inputs = cloned.querySelectorAll('input');
            for (let input of inputs) {
              let inputName = input.dataset.name;
              const newName = inputName + "-" + Subscribie.incrementFieldIndex(inputName, input.dataset.multidimensional, formGroupIndex);
              input.name = newName;
            }
          } //End formGroup index handling
          cloneTarget.parentElement.appendChild(cloned);
          console.log(target);

      });
    },
    controlIndexCount: {},
    incrementFieldIndex: function(controlName, multidimensional=false,formGroupIndex=0) {
        currentValue = Subscribie.getFieldIndex(controlName);
        if (!multidimensional) 
        {
            Subscribie.setFieldIndex(controlName, currentValue + 1);
            return Subscribie.getFieldIndex(controlName);
        } else {
           parts = currentValue.currentIndex.split('-');
           elementIndex = parseInt(parts[1]);
           if (elementIndex + 1 == currentValue.maxPerGroup)
           {
              elementIndex = 0;  
           } else {
              elementIndex = elementIndex + 1;
           }
           newValue = formGroupIndex + '-' + elementIndex;
           Subscribie.setFieldIndex(controlName, newValue, multidimensional=true);   
           return Subscribie.getFieldIndex(controlName, multidimensional=true);
        }
    },
    getFieldIndex: function(controlName, multidimensional=false) {
        if (!multidimensional)
        {
           return Subscribie.controlIndexCount[controlName];
        } else {
           return Subscribie.getFieldIndex(controlName).currentIndex;
        }
    },
    setFieldIndex: function(controlName, value, multidimensional=false) {
        if (!multidimensional) 
        {
            return Subscribie.controlIndexCount[controlName] = value;
        } else {
            Subscribie.controlIndexCount[controlName].currentIndex = value;
        }
    },
    reIndexFormGroups: function(containingClass) {

    }
}

