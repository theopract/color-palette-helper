import Vue from 'vue'
import App from './App.vue'

let target;
let target2;

Vue.directive('dropzone', {
  bind(el, binding) {
    const event = binding.arg;
    const fn = binding.value;

    el.addEventListener('dragstart', dragStart);
    el.addEventListener('dragenter', dragEnter);
    el.addEventListener('dragover', dragOver);
    el.addEventListener('dragleave', dragLeave);
    el.addEventListener('drop', dragDrop);

    function dragStart(e) {
      console.log(e);
      console.log(event);
      target = e.target;
      target2 = e.target.nextElementSibling;
      setTimeout(() => {
        this.classList.add('invisible');
      }, 0);
    }
    
    function dragEnter(e) {
      e.preventDefault();
      if (event === 'hovered') {
        this.classList.add('hovered');
      } else {
        // this.style.outline = '2px dashed #3c3c3c';
      }
      console.log('Drag Enter');
    }
    function dragOver(e) {
      e.preventDefault();
      
      console.log('Drag Over' + this);
    }
    function dragLeave() {
      if (event === 'hovered') {
        this.classList.remove('hovered');
      } else {
        // this.style.outline = 'none';
      }
      console.log('Drag Leave');
    }
    function dragDrop(e) {
      if (event === 'hovered') {
        let nextSibling = e.srcElement.nextSibling
        let parent = e.srcElement.parentNode;
        parent.insertBefore(target, nextSibling);
        parent.insertBefore(target2, nextSibling);
        this.classList.remove('hovered');
        target.classList.remove('invisible');
      } else {
        this.style.outline = 'none';
      }
      console.log('Drag Drop');
    }
    
    // console.log(`clicked fired with expression: "${binding.expression}"`);
  },
})

new Vue({
  el: '#app',
  render: h => h(App)
})
