package handlers

import (
	"encoding/json"
	"fmt"
	data "groupie/json"
	"html/template"
	"net/http"
	"strconv"
	"strings"
)

var Artists = []data.Artists{}

func Data() {
	channel := make(chan []data.Artists)
	go data.GetData(channel)
	Artists = <-channel
}
func Home(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		Error(w, http.StatusNotFound)
		return
	}
	tmpl := template.Must(template.ParseFiles("./templates/index.html"))
	searched := r.FormValue("search")
	tab := Search(searched)
	sort := r.FormValue("sort")
	on := ""
	dir := ""
	if sort != "" {
		on = strings.Split(sort, ":")[0]
		dir = strings.Split(sort, ":")[1]
	}
	data.Sort(tab, on, dir)
	data := map[string]interface{}{
		"Artist": tab,
	}
	tmpl.Execute(w, data)
}

func Error(w http.ResponseWriter, err int) {
	tmpl := template.Must(template.ParseFiles("./templates/error.html"))
	data := map[string]interface{}{}
	var content string
	if err == 404 {
		content = ": Page Not Found"
		data["Error"] = "404"
		data["Data"] = "Page Not Found"
	}
	if err == 500 {
		content = ": Something went wrong"
		data["Error"] = "500"
		data["Data"] = "Something went wrong"
	}
	if err == 400 {
		content = ": Bad Request"
		data["Error"] = "400"
		data["Data"] = "Bad Request"
	}
	fmt.Println("Error", err, content)
	tmpl.Execute(w, data)
}

func Artist(w http.ResponseWriter, r *http.Request) {
	tmpl := template.Must(template.ParseFiles("./templates/artist.html"))
	id := r.URL.Path[8:]
	id_int, _ := strconv.Atoi(id)
	if id_int > 52 || id_int < 1 {
		Error(w, http.StatusInternalServerError)
		return
	}
	id_int = id_int - 1
	prev := id_int
	next := id_int + 2
	if id_int == 0 {
		prev = 52
	}
	if id_int == 53 {
		next = 1
	}
	data := map[string]interface{}{
		"Next":         strconv.Itoa(next),
		"Prev":         strconv.Itoa(prev),
		"Image":        Artists[id_int].Image,
		"Name":         Artists[id_int].Name,
		"CreationDate": Artists[id_int].CreationDate,
		"FirstAlbum":   Artists[id_int].FirstAlbum,
		"Members":      Artists[id_int].Members,
		"Concerts":     data.Relation(Artists[id_int]),
	}
	tmpl.Execute(w, data)
}
func Suggest(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query().Get("q")
	suggestions := Search(query)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(suggestions)
}

func Search(datastr string) []data.Artists {
	temp := []data.Artists{}
	if datastr == "" {
		return Artists
	}
	if !isNumeric(datastr) {
		for _, i := range Artists {
			for _, j := range strings.Split(i.Name, " ") {
				if len(datastr) > len(j) {
					continue
				}
				if strings.EqualFold(datastr, j[:len(datastr)]) {
					temp = append(temp, i)
					break
				}
			}

		}
	} else {
		for _, i := range Artists {
			date := strconv.Itoa(i.CreationDate)
			album := i.FirstAlbum[6:]
			if len(datastr) > len(album) && len(datastr) > len(date) {
				continue
			}
			if strings.EqualFold(datastr, album[:len(datastr)]) || strings.EqualFold(datastr, date[:len(datastr)]) {
				temp = append(temp, i)
			}
		}
	}

	return temp
}

func isNumeric(s string) bool {
	for _, i := range s {
		if (i < '0' || i > '9') && i != '-' {
			return false
		}
	}
	return true
}
