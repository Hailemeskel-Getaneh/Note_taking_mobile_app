import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#7360DF",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
    marginTop: 20
  },
  backButton: {
    padding: 8
  },
  hamburgerButton: {
    padding: 8
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "sans-serif"
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 5,
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
    color:'black'
  },
  searchIcon: {
    marginRight: 10
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: "sans-serif",
    color: "black"
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 20,
    marginTop: 10
  },
  categoryButton: {
    backgroundColor: "#FFF5E0",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1
  },
  categoryText: {
    color: "black",
    fontSize: 14,
    fontFamily: "sans-serif-medium"
  },
  activeCategoryButton: {
    backgroundColor: "#7360DF"
  },
  activeCategoryText: {
    color: "#fff"
  },
  notesContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 10
  },
  noNotesText: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 20,
    color: "#666",
    fontFamily: "sans-serif"
  },
  noteItem: {
    flexDirection: "column",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10
  },
  priorityNote: {
    borderColor: "#F26B0F",
    borderWidth: 2
  },
  noteHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4
  },
  noteDate: {
    fontSize: 12,
    color: "black",
    fontFamily: "sans-serif"
  },
  favoriteButton: {
    padding: 4,
    alignSelf: "flex-end"
  },
  favoriteActive: {
    backgroundColor: "#7360DF",
    borderRadius: 4
  },
  noteContent: {
    marginTop: 4
  },
  noteText: {
    fontSize: 16,
    fontWeight: "500",
    color: "black",
    fontFamily: "Gill Sans"
  },
  moreButton: {
    padding: 8,
    alignSelf: "flex-end"
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#888",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 5
  },
  timeText: {
    fontSize: 12,
    marginLeft: 4,
    fontFamily: "sans-serif",
    color: "black"
  },
  footer: {
    padding: 10,
    alignItems: "center"
  },
  footerText: {
    fontSize: 14,
    color: "#666",
    fontFamily: "sans-serif"
  },
  addNoteButton: {
    backgroundColor: "#7360DF",
    padding: 4,
    borderRadius: 5,
    alignSelf: "center",
    marginVertical: 20,
    width: "70%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
    color: "white",
  },
  addNoteText:{
    color: "white",
    fontSize: 20,
  },
  addModeContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#FFF",
    zIndex: 999,
    padding: 20
  },
  addModeHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#7360DF",
    padding: 10,
    borderRadius: 10
  },
  addModeTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 10
  },
  addModeInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: "sans-serif",
    color: "black",
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 10,
    padding: 10,
    marginVertical: 20,
    textAlignVertical: "top"
  },
  addModeActions: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  addModeActionButton: {
    marginLeft: 15
  },
  addModeActionText: {
    fontSize: 16,
    fontFamily: "sans-serif-medium",
    color: "#1F4529"
  },
  actionMenuOverlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  actionMenu: {
    position: "absolute",
    bottom: 10,
    right: 0,
    backgroundColor: "#FFF",
    padding: 40,
    paddingLeft: 20,
    borderTopLeftRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd"
  },
  actionMenuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8
  },
  actionMenuItemText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#333"
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  hamburgerModal: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFF",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  modalItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: "#1F4529",
    paddingLeft: 40,
    marginBottom: 5
  },
  modalItemText: {
    fontSize: 16,
    fontFamily: "sans-serif-medium",
    color: "#fff",
    marginLeft: 8
  },
  expandedContainer: {
    flex: 1,
    padding: 15
  },
  expandedTextInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: "sans-serif",
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    textAlignVertical: "top"
  },
  expandedActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10
  },
  expandedButton: {
    marginLeft: 15
  },
  expandedButtonText: {
    fontSize: 16,
    fontFamily: "sans-serif-medium",
    color: "#1F4529"
  }
});
