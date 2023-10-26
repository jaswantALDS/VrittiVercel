import React, { Component, ReactNode } from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  TextInput,
  Dimensions,
  Animated,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Modal from "react-native-modal";
import Button from "./lib/Button";
import TagItem from "./lib/TagItem";
import utilities from "./lib/utilities";
import PropTypes from "prop-types";
import { TextS400 } from "../../components/Text";
import {
  FormControl,
  PresenceTransition,
  WarningOutlineIcon,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { Image } from "react-native";
import { lightColors } from "../../theme/colors";

const { height } = Dimensions.get("window");
const INIT_HEIGHT = height * 0.6;

interface CountryCodePickerProps {
  data: any[];
  style?: any;
  defaultFontName?: string;
  selectedTitleStyle?: any;
  buttonTextStyle?: any;
  buttonStyle?: any;
  title?: string;
  onSelect?: (selectedIds: number[], selectedItems: any[]) => void;
  onRemoveItem?: (selectedIds: number[], selectedItems: any[]) => void;
  popupTitle?: string;
  colorTheme?: string;
  isSelectSingle?: boolean;
  showSearchBox?: boolean;
  cancelButtonText?: string;
  selectButtonText?: string;
  label?: string;
  error?: string;
  touched?: string;
}

interface CountryCodePickerState {
  show: boolean;
  preSelectedItem: any[];
  selectedItem: any[];
  data: any[];
  keyword: string;
}

const initialState: CountryCodePickerState = {
  show: false,
  preSelectedItem: [],
  selectedItem: [],
  data: [],
  keyword: "",
};

class CountryCodePicker extends Component<
  CountryCodePickerProps,
  CountryCodePickerState
> {
  static defaultProps: CountryCodePickerProps = {
    cancelButtonText: "Cancel",
    selectButtonText: "Select",
    searchPlaceHolderText: "Search",
    listEmptyTitle: "No data",
    colorTheme: "#16a45f",
    buttonTextStyle: {},
    buttonStyle: {},
    showSearchBox: true,
  };

  animatedHeight = new Animated.Value(INIT_HEIGHT);

  constructor(props: CountryCodePickerProps) {
    super(props);
    this.state = { ...initialState };
  }

  componentDidMount() {
    this.init();
  }

  componentDidUpdate(prevProps: CountryCodePickerProps) {
    if (prevProps.data !== this.props.data) {
      this.init();
    }
  }

  init(newProps?: CountryCodePickerProps) {
    let preSelectedItem = [];
    let { data } = newProps || this.props;

    data?.map((item) => {
      if (item.checked) {
        preSelectedItem?.push(item);
      }
    });
    if (this.state.preSelectedItem.length > 0) {
      this.setState({ data, preSelectedItem: this.state.preSelectedItem });
    } else this.setState({ data, preSelectedItem });
  }

  get dataRender() {
    let { data, keyword } = this.state;
    let listMappingKeyword = [];
    data?.map((item) => {
      if (
        utilities
          .changeAlias(item.name)
          .includes(utilities.changeAlias(keyword)) ||
        utilities.changeAlias(item.id).includes(utilities.changeAlias(keyword))
      ) {
        listMappingKeyword.push(item);
      }
    });
    return listMappingKeyword;
  }

  get defaultFont() {
    let { defaultFontName } = this.props;
    return defaultFontName ? { fontFamily: defaultFontName } : {};
  }

  cancelSelection() {
    let { data, preSelectedItem } = this.state;
    data?.map((item) => {
      item.checked = false;
      for (let _selectedItem of preSelectedItem) {
        if (item.id == _selectedItem.id) {
          item.checked = true;
          break;
        }
      }
    });
    this.setState({
      data,
      show: false,
      keyword: "",
      selectedItem: preSelectedItem,
    });
  }

  onItemSelected = (item: any, isSelectSingle: boolean) => {
    let selectedItem = [];
    let { data } = this.state;
    item.checked = !item.checked;
    for (let index in data) {
      if (data[index].id == item.id) {
        data[index] = item;
      } else if (isSelectSingle) {
        data[index].checked = false;
      }
    }
    data?.map((item) => {
      if (item.checked) selectedItem.push(item);
    });
    this.setState({ data, selectedItem });
  };

  keyExtractor = (item: any, idx: number) => idx.toString();

  renderItem = ({ item, idx }: { item: any; idx: number }) => {
    let { colorTheme, isSelectSingle } = this.props;
    return (
      <TouchableOpacity
        key={idx}
        onPress={() => this.onItemSelected(item, isSelectSingle)}
        activeOpacity={0.7}
        style={styles.itemWrapper}
      >
        {/* <View className="flex-row"> */}

        <Text style={[styles.itemText, this.defaultFont]}>
          <Image
            source={{
              uri: item.image
                ? item.image
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX5N51wgLZBZanoM9HIqI-Z8-sCU7w_3-qMw&usqp=CAU",
            }}
            className="w-4 h-4"
          />{" "}
          +{item.id}({item.name})
        </Text>
        {/* </View> */}
        <Icon
          style={styles.itemIcon}
          name={item.checked ? "check-circle-outline" : "radiobox-blank"}
          color={item.checked ? lightColors.primary : "#777777"}
          size={20}
        />
      </TouchableOpacity>
    );
  };

  renderEmpty = () => {
    let { listEmptyTitle } = this.props;
    return (
      <Text style={[styles.empty, this.defaultFont]}>{listEmptyTitle}</Text>
    );
  };

  closeModal = () => this.setState({ show: false });

  showModal = () => this.setState({ show: true });

  render() {
    let {
      style,
      modalStyle,
      title,
      onSelect,
      onRemoveItem,
      popupTitle,
      colorTheme,
      isSelectSingle,
      cancelButtonText,
      selectButtonText,
      searchPlaceHolderText,
      selectedTitleStyle,
      buttonTextStyle,
      buttonStyle,
      showSearchBox,
      label,
      error,
      touched,
    } = this.props;
    let { show, selectedItem, preSelectedItem } = this.state;

    return (
      <>
        <View>
          <TextS400 className={`text-fifth text-lg ob-1.5 py-1.5 px-4`}>
            {label}
          </TextS400>

          <FormControl isInvalid={touched && error ? true : false} w={"100%"}>
            <TouchableOpacity
              onPress={this.showModal}
              activeOpacity={0.7}
              style={[styles.container, style]}
            >
              <Modal
                onBackdropPress={this.closeModal}
                style={{
                  justifyContent: "flex-end",
                  margin: 0,
                }}
                useNativeDriver={true}
                animationInTiming={300}
                animationOutTiming={300}
                hideModalContentWhileAnimating
                isVisible={show}
              >
                <Animated.View
                  style={[
                    styles.modalContainer,
                    modalStyle,
                    { height: this.animatedHeight },
                  ]}
                >
                  <View>
                    <Text
                      style={[
                        styles.title,
                        this.defaultFont,
                        { color: lightColors.primary },
                      ]}
                    >
                      {popupTitle || title}
                    </Text>
                  </View>
                  <View style={styles.line} />
                  {showSearchBox ? (
                    <TextInput
                      underlineColorAndroid="transparent"
                      returnKeyType="done"
                      style={[styles.inputKeyword, this.defaultFont]}
                      placeholder={searchPlaceHolderText}
                      selectionColor={colorTheme}
                      onChangeText={(keyword) => this.setState({ keyword })}
                      onFocus={() => {
                        Animated.spring(this.animatedHeight, {
                          toValue:
                            INIT_HEIGHT +
                            (Platform.OS === "ios" ? height * 0.2 : 0),
                          friction: 7,
                        }).start();
                      }}
                      onBlur={() => {
                        Animated.spring(this.animatedHeight, {
                          toValue: INIT_HEIGHT,
                          friction: 7,
                        }).start();
                      }}
                    />
                  ) : null}
                  <FlatList
                    style={styles.listOption}
                    data={this.dataRender || []}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderItem}
                    ListEmptyComponent={this.renderEmpty}
                  />

                  <View style={styles.buttonWrapper}>
                    <Button
                      defaultFont={this.defaultFont}
                      onPress={() => {
                        this.cancelSelection();
                      }}
                      title={cancelButtonText}
                      textColor={lightColors.primary}
                      backgroundColor="#fff"
                      textStyle={buttonTextStyle}
                      style={[
                        styles.button,
                        buttonStyle,
                        {
                          marginRight: 5,
                          marginLeft: 10,
                          borderWidth: 1,
                          borderColor: lightColors.primary,
                        },
                      ]}
                    />

                    <Button
                      defaultFont={this.defaultFont}
                      onPress={() => {
                        let selectedIds = [],
                          selectedObjectItems = [];
                        selectedItem?.map((item) => {
                          selectedIds.push(item);
                          selectedObjectItems.push(item);
                        });

                        this.setState({
                          show: false,
                        });
                        onSelect && isSelectSingle
                          ? onSelect(selectedIds[0], selectedObjectItems[0])
                          : onSelect(selectedIds, selectedObjectItems);

                        this.setState({
                          keyword: "",
                          preSelectedItem: selectedItem,
                        });
                      }}
                      title={selectButtonText}
                      backgroundColor={lightColors.primary}
                      textStyle={buttonTextStyle}
                      style={[
                        styles.button,
                        buttonStyle,
                        { marginLeft: 5, marginRight: 10 },
                      ]}
                    />
                  </View>
                </Animated.View>
              </Modal>
              {preSelectedItem.length > 0 ? (
                isSelectSingle ? (
                  <Text
                    style={[
                      styles.selectedTitlte,
                      this.defaultFont,
                      selectedTitleStyle,
                      { color: "white" },
                    ]}
                  >
                    <Image
                      source={{
                        uri: preSelectedItem[0]?.image
                          ? preSelectedItem[0].image
                          : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX5N51wgLZBZanoM9HIqI-Z8-sCU7w_3-qMw&usqp=CAU",
                      }}
                      className="w-4 h-4"
                    />{" "}
                    +{preSelectedItem[0].id}
                  </Text>
                ) : (
                  <View style={styles.tagWrapper}>
                    {preSelectedItem?.map((tag, index) => {
                      return (
                        <TagItem
                          key={index}
                          onRemoveTag={() => {
                            let preSelectedItem = [];
                            let selectedIds = [],
                              selectedObjectItems = [];
                            let { data } = this.state;
                            data?.map((item) => {
                              if (item.id == tag.id) {
                                item.checked = false;
                              }
                              if (item.checked) {
                                preSelectedItem.push(item);
                                selectedIds.push(item.id);
                                selectedObjectItems.push(item);
                              }
                            });
                            this.setState({ data, preSelectedItem });
                            onRemoveItem &&
                              onRemoveItem(selectedIds, selectedObjectItems);
                          }}
                          tagName={tag.id}
                        />
                      );
                    })}
                  </View>
                )
              ) : (
                <View className="flex-row w-full">
                  <Text
                    style={[
                      styles.selectedTitlte,
                      this.defaultFont,
                      selectedTitleStyle,
                    ]}
                  >
                    {title}
                  </Text>
                  <AntDesign name="down" size={18} color={style.borderColor} />
                </View>
              )}
            </TouchableOpacity>

            <PresenceTransition
              visible={error && touched ? true : false}
              initial={{
                opacity: 0,
                translateY: 80,
              }}
              animate={{
                opacity: 1,
                translateY: 0,
                transition: {
                  duration: 200,
                },
              }}
              className={``}
            >
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="sm" />}
              >
                <TextS400>{error}</TextS400>
              </FormControl.ErrorMessage>
            </PresenceTransition>
          </FormControl>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: 45,
    borderRadius: 2,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#6B7280",
    paddingVertical: 16,
  },
  modalContainer: {
    paddingTop: 16,
    backgroundColor: "#fff",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  title: {
    fontSize: 16,
    marginBottom: 16,
    width: "100%",
    textAlign: "center",
  },
  line: {
    height: 1,
    width: "100%",
    backgroundColor: "#cacaca",
  },
  inputKeyword: {
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#cacaca",
    paddingLeft: 8,
    marginHorizontal: 24,
    marginTop: 16,
  },
  buttonWrapper: {
    marginVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    height: 36,
    flex: 1,
  },
  selectedTitlte: {
    fontSize: 14,
    color: "gray",
    flex: 1,
  },
  tagWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  listOption: {
    paddingHorizontal: 24,
    paddingTop: 1,
    marginTop: 16,
  },
  itemWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: "#eaeaea",
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  itemText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  itemIcon: {
    width: 30,
    textAlign: "right",
  },
  empty: {
    fontSize: 16,
    color: "gray",
    alignSelf: "center",
    textAlign: "center",
    paddingTop: 16,
  },
});

export default CountryCodePicker;
