import { useState } from 'react';
import {
  ImageBackground,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  Keyboard,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { authSignInUser } from '../../redux/auth/authOperations';

const initialState = {
  email: '',
  password: '',
};

const LoginScreen = ({ navigation }) => {
  const [isActiveEmail, setIsActiveEmail] = useState(false);
  const [isActivePassword, setIsActivePassword] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);

  const dispatch = useDispatch();

  const keyboardHide = () => {
    setIsShowKeyboard(true);
    Keyboard.dismiss();
  };

  const handleLogin = () => {
    setIsShowKeyboard(true);
    Keyboard.dismiss();
    dispatch(authSignInUser(state));
    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          source={require('../../assets/images/PhotoBG.jpg')}
          style={styles.image}
        >
          <View style={styles.form}>
            <Text style={styles.textInput}>Увійти</Text>
            <TextInput
              style={{
                ...styles.input,
                borderColor: isActiveEmail ? '#FF6C00' : '#E8E8E8',
                backgroundColor: isActiveEmail ? '#FFFFFF' : '#F6F6F6',
              }}
              placeholder="Адреса електронної пошти"
              placeholderTextColor="#BDBDBD"
              value={state.email}
              marginBottom={16}
              onFocus={() => setIsActiveEmail(true)}
              onBlur={() => setIsActiveEmail(false)}
              onChangeText={value =>
                setState(prevState => ({ ...prevState, email: value }))
              }
            />
            <View style={styles.inputContainer}>
              <TextInput
                style={{
                  ...styles.inputPassword,
                  borderColor: isActivePassword ? '#FF6C00' : '#E8E8E8',
                  backgroundColor: isActivePassword ? '#FFFFFF' : '#F6F6F6',
                }}
                placeholder="Пароль"
                value={state.password}
                secureTextEntry={showPassword}
                placeholderTextColor="#BDBDBD"
                marginBottom={43}
                onFocus={() => setIsActivePassword(true)}
                onBlur={() => setIsActivePassword(false)}
                onChangeText={value =>
                  setState(prevState => ({ ...prevState, password: value }))
                }
              />
              <TouchableOpacity
                style={styles.buttonPassword}
                activeOpacity={0.7}
                onPressIn={() => setShowPassword(false)}
                onPressOut={() => setShowPassword(true)}
              >
                <Text style={styles.buttonText}>Показати</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.buttonPrimary}
              activeOpacity={0.7}
              onPress={handleLogin}
            >
              <Text style={styles.buttonPrimaryText}>Увійти</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.7}
              onPress={() => {
                navigation.navigate('Registration');
              }}
            >
              <Text style={styles.buttonText}>
                Немає акаунта? Зареєструватися
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },

  form: {
    flex: 0.6,
    height: 516,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#FFFFFF',
  },

  textInput: {
    fontFamily: 'Roboto-Medium',
    fontSize: 30,
    lineHeight: 35,
    textAlign: 'center',
    letterSpacing: 0.01,
    color: '#212121',
    marginBottom: 32,
    marginTop: 32,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
    paddingLeft: 16,
    fontFamily: 'Roboto-Regular',
    color: '#212121',
    fontSize: 16,
    lineHeight: 19,
    marginHorizontal: 16,
  },
  inputContainer: {
    marginHorizontal: 16,
    position: 'relative',
    color: '#1B4371',
  },
  inputPassword: {
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
    paddingLeft: 16,
    fontFamily: 'Roboto-Regular',
    color: '#212121',
    fontSize: 16,
    lineHeight: 19,
  },
  buttonPassword: {
    position: 'absolute',
    paddingVertical: 16,
    right: 0,
    marginRight: 16,
  },
  buttonPasswordText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    color: '#1B4371',
  },
  buttonPrimary: {
    borderRadius: 100,
    backgroundColor: '#FF6C00',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  buttonPrimaryText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: '#FFFFFF',
    paddingVertical: 16,
  },
  buttonText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    color: '#1B4371',
  },
});
export default LoginScreen;
