import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

function DropMenu() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('dongne1');
  const [items, setItems] = useState([
    {label: '동네 1', value: 'dongne1'},
    {label: '동네 2', value: 'dongne2'},
    {label: '동네 3', value: 'dongne3'}
  ]);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      style={styles.dropdown}
      containerStyle={styles.dropdownContainer}
      textStyle={styles.dropdownText}
      dropDownContainerStyle={styles.dropdownContainerStyle}
      selectedItemLabelStyle={styles.selectedItemLabelStyle}
      itemSeparatorStyle={styles.itemSeparator}
      selectedLabelStyle={styles.selectedLabel}
      showTickIcon={false}
    />
  );
}

const styles = StyleSheet.create({
  dropdown: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: 'skyblue'
  },
  dropdownContainer: {
    width: 150,
  },
  dropdownContainerStyle: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'skyblue',
  },
  dropdownText: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  selectedItemLabelStyle: {
    color: 'skyblue',
  },
  itemSeparator: {
    height: 1,
    backgroundColor: "#CED0CE",
  },
  selectedLabel: {
    textAlign: 'center',
  },
});

export default DropMenu;
