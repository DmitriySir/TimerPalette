import { makeObservable, observable, action } from 'mobx';

class ColorStore {
  showPicker = false;
  selectedColor = null;
  colors = [];
  hoveredIndex = null;

  setShowPicker(value) {
    this.showPicker = value;
  }

  setSelectedColor(index) {
    this.selectedColor = index;
  }

  addColor(color) {
    this.colors.push(color);
  }

  deleteColor(index) {
    this.colors.splice(index, 1);
  }

  setHoveredIndex(index) {
    this.hoveredIndex = index;
  }
}

const colorStore = new ColorStore();
makeObservable(colorStore, {
  showPicker: observable,
  selectedColor: observable,
  colors: observable,
  hoveredIndex: observable,
  setShowPicker: action,
  setSelectedColor: action,
  addColor: action,
  deleteColor: action,
  setHoveredIndex: action,
});

export default colorStore;