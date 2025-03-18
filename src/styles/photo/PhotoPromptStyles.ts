import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const IMAGE_WIDTH = width * 0.7;
const IMAGE_HEIGHT = IMAGE_WIDTH * (16 / 9);

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  progressDotActive: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  progressDotInactive: {
    fontSize: 16,
    color: '#bbb',
  },
  progressLine: {
    width: 20,
    height: 2,
    backgroundColor: '#bbb',
  },
  sliderWrapper: {
    height: IMAGE_HEIGHT + 40,
    justifyContent: 'center',
  },
  slide: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  imageText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  captionBox: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
  },
  captionText: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 12,
    marginHorizontal: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
