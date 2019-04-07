<template>
  <div id="app">
    <h1>{{ title }}</h1>
    
    <div v-if="showNative">
      <h2>Native Drag'n'Drop</h2>
      <div class="container">
        <template v-for="(color, index) in colors">
          <div  class="block native text-center dropzone-active" 
                :style="{'background-color': color}" 
                :key="color"
                draggable="true"
                v-dropzone>{{ index + 1 }}</div>
          <div class="empty" 
              :key="index"
              v-dropzone:hovered="'hovered'"></div>
        </template>
      </div>
    </div>
    
    <div v-if="showVue">
      <h2>Vue drag'n'drop</h2>
      <Container :orientation="'horizontal'" @drop="onDrop" drag-class="dragged" :should-accept-drop="shouldAcceptDrop">
        <Draggable v-for="(color, index) in colors" :key="index">
          <div class="block text-center" :style="{'background-color': color}">{{ index + 1 }}</div>
        </Draggable>
      </Container>
    </div>
    <hr> 

    <Container :orientation="'horizontal'" drag-class="dragged" behaviour="copy" :get-child-payload="getChildPayload">
      <Draggable v-for="(color, index) in demo_palette" :key="index">
        <div class="block text-center" :style="{'background-color': color}">{{ index + 1 }}</div>
      </Draggable>
    </Container>

    <label>
    Массив цветов:
    <input type="text" v-bind:value="colors" v-on:input="colors = ($event.target.value).split(',')">
    </label>
    <p class="output-text">["{{colors.join('","')}}"]</p>

    </div>
</template>

<script>
import { Container, Draggable } from "vue-smooth-dnd";
export default {
  name: 'app',
  components: { Container, Draggable },
  data () {
    return {
      title: 'Color Pallete Helper',
      showNative: false,
      showVue: true,
      colors: ["#34A571", "#16B0DD", "#FD931D", "#974994", "#E43B37", "#68C74F", "#4A38A4", "#E23D80", "#002A3A", "#FF4F00", "#E9B4DB", "#A8CE61", "#F7BC24", "#FFF563"],
      demo_palette: ["#38AB88", "#44AB33", "red", "grey"]
    }
  },
  methods: {
    onDrop: function(dropResults) {
      let insertedColor = dropResults.payload;
      if (insertedColor) {
        if (this.colors.includes(insertedColor)) {
          alert(`Color ${insertedColor} already is in the array! Can not include duplicate values!`);
        } else {
          this.colors.splice(dropResults.addedIndex, 0, insertedColor);
        }
        
      } else {
        this.colors.splice(dropResults.addedIndex, 0, this.colors.splice(dropResults.removedIndex, 1).toString());
      }
      
    },
    shouldAcceptDrop (sourceContainerOptions, payload) {
      return true;
    },
    getChildPayload (index) {
      return this.demo_palette[index];
    }
  }
}
</script>

<style>
  #app {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  .container {
    display: flex !important;
    margin: 1em 1em;
    height: 100px;
  }

  label {
    width: 10%;
  }

  input {
    padding: 10px;
    width: 90%;
  }

  .text-center {
    text-align: center;
  }

  .dragged {
    transform: rotateZ(8deg);
  }

  .smooth-dnd-container.horizontal {
    display: flex;
    margin: 1em;
  }

  .smooth-dnd-draggable-wrapper {
    flex: 1 0 40px;
    max-width: 64px;
    margin-right: 5px;
  }

  .output-text {
    word-wrap: break-word; 
    display: inline-block;
    max-width: 100%;
  }

  .block {
    box-sizing: border-box;
    height: 100px;
    max-width: 64px;
    background-color: aqua;
    color: white;
    font-size: 1.4em;
    padding: 10px 10px;
    position: relative;
  }
  .block.native {
    width: 40px;
    flex: 1 0 40px;
  }

  .empty {
    height: 100px;
    flex: 0 0 5px;
    background-color: white;
  }
  .hovered {
    flex-basis: 60px;
    border: 2px dashed #3c3c3c;
  }
  .placeholder {
    width: 20px;
    height: 100px;
    background-color: darkgrey;
  }

  .invisible {
    display: none;
  }

</style>
