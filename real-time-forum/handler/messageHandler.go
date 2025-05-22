package handler

import (
	"encoding/json"
	"net/http"
	"real-time-forum/database"
	"real-time-forum/variables"
	"strconv"

	"github.com/gorilla/mux"
)

func GetMessageHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	nickname := vars["nickname"]
	user := database.GetCurrentUser(r)
	if user == nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	// Get limit and offset from query parameters
	limit := 10
	offset := 0
	if l := r.URL.Query().Get("limit"); l != "" {
		limit, _ = strconv.Atoi(l)
	}
	if o := r.URL.Query().Get("offset"); o != "" {
		offset, _ = strconv.Atoi(o)
	}

	messages, err := database.GetMessages(nickname, user.Nickname, limit, offset)
	if err != nil {
		http.Error(w, "Failed to retrieve messages", http.StatusInternalServerError)
		return
	}

	// Toujours retourner un tableau, même s'il est vide
	if messages == nil {
		messages = []*variables.Message{}
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(messages); err != nil {
		http.Error(w, "Failed to encode messages", http.StatusInternalServerError)
	}
}
