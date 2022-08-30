import {View, Text} from 'react-native';
import React, {useState, useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Header} from './../Components/Header';
import {CustomInput} from './../Components/CustomInput';
import {CustomButton} from './../Components/CustomButton';
import {DropdownComponent} from './../Components/DropdownComponent';
import {useToast} from 'react-native-toast-notifications';
import {calculate} from './../Utils/Utils';
import Slider from 'rn-range-slider';
import Thumb from './Thumb';
import Rail from './Rail';
import RailSelected from './RailSelected';
import Label from './Label';
import Notch from './Notch';

const DropDownData = [
  {label: 'Addition', value: 'Addition'},
  {label: 'Subtract', value: 'Subtract'},
  {label: 'Multiply', value: 'Multiply'},
];
export function Calculator() {
  const [firstNum, setfirst] = useState('');
  const [secondNum, setsecond] = useState('');
  const [Operation, setOperation] = useState('Addition');
  const [output, setOutput] = useState('');
  const toast = useToast();
  const [isLoading, setisLoading] = useState(false);
  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(value => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);
  const handleValueChange = useCallback(high => {
    setfirst(high);
  }, []);
  const handleValueChangeSecond = useCallback(high => {
    setsecond(high);
  }, []);
  const handleOnClick = async () => {
    if (firstNum === '' && secondNum === '') {
      toast.show('Enter Numbers', {
        type: 'normal',
        placement: 'top',
        duration: 4000,
        offset: 30,
        animationType: 'slide-in',
      });
    } else {
      setisLoading(true);
      let result = await calculate(firstNum, secondNum, Operation);
      result = JSON.parse(result);

      if (result.result) {
        setOutput(result.value);
      } else {
        toast.show(result.value, {
          type: 'normal',
          placement: 'top',
          duration: 4000,
          offset: 30,
          animationType: 'slide-in',
        });
      }
      setisLoading(false);
    }
  };
  return (
    <SafeAreaView style={safeAreaConatiner}>
      <View style={mainContainer}>
        <Header text="Calculator" />
        <View style={subConatiner}>
          <Slider
            min={0}
            max={100}
            step={1}
            floatingLabel
            renderThumb={renderThumb}
            renderRail={renderRail}
            renderRailSelected={renderRailSelected}
            renderLabel={renderLabel}
            renderNotch={renderNotch}
            onValueChanged={handleValueChange}
            disableRange={true}
          />
          <Text style={{color: 'black'}}>first slider value{firstNum}</Text>

          <Slider
            min={0}
            max={100}
            step={1}
            floatingLabel
            renderThumb={renderThumb}
            renderRail={renderRail}
            renderRailSelected={renderRailSelected}
            renderLabel={renderLabel}
            renderNotch={renderNotch}
            onValueChanged={handleValueChangeSecond}
            disableRange={true}
          />
          <Text style={{color: 'black'}}>second slider value{secondNum}</Text>

          <DropdownComponent
            data={DropDownData}
            value={Operation}
            updateValue={data => {
              setOperation(data);
            }}
          />
          <CustomButton
            text={`Perfrom ${Operation}`}
            onPress={handleOnClick}
            isloading={isLoading}
          />
          {output !== '' && <Text style={textField}>Result: {output}</Text>}
        </View>
      </View>
    </SafeAreaView>
  );
}

const safeAreaConatiner = {
  flex: 1,
  backgroundColor: 'white',
};
const mainContainer = {
  flex: 1,
  paddingHorizontal: 10,
};
const subConatiner = {
  flex: 1,
};
const textField = {
  color: 'black',
  fontSize: 20,
};
