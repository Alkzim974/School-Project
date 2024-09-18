package main

import (
	"fmt"
	"html/template"
	"log"
	"net/http"
	"time"
	"web/ascii"
)

func FormattoHtml(s string) string {
	format_str := "<p>"
	for _, i := range s {
		if i == 32 {
			format_str += "&nbsp;"
		} else if i == 10 {
			format_str += "<br>"
		} else {
			format_str += string(i)
		}
	}
	return format_str + "</p>"
}

const port = ":8080"

func Home(w http.ResponseWriter, r *http.Request) {
	tmpl := template.Must(template.ParseFiles("./templates/index.html"))

	if r.Method != http.MethodPost {
		tmpl.Execute(w, nil)
		return
	}
	text := r.FormValue("text")
	banner := r.FormValue("banner")
	if banner == "" {
		tmpl = template.Must(template.ParseFiles("./templates/error400.html"))
		tmpl.Execute(w, http.StatusInternalServerError)
		return
	}
	if !VerifText(text) {
		tmpl = template.Must(template.ParseFiles("./templates/error500.html"))
		tmpl.Execute(w, http.StatusInternalServerError)
		return
	}
	data := map[string]interface{}{
		"Ascii": template.HTML(FormattoHtml(ascii.Ascii(text, banner))),
	}
	tmpl.Execute(w, data)
}
func Error404(w http.ResponseWriter, r *http.Request) {
	tmpl := template.Must(template.ParseFiles("./templates/error404.html"))
	tmpl.Execute(w, nil)
}

func main() {
	http.Handle("/templates/stylesheets/", http.StripPrefix("/templates/stylesheets/", http.FileServer(http.Dir("./templates/stylesheets/"))))
	http.HandleFunc("/home", Home)
	http.HandleFunc("/", Error404)
	// fmt.Println("Listening... (http://localhost:8080/)")
	// http.ListenAndServe(port, nil)
	srv := &http.Server{
		Addr:              port,              //adresse du server (le port choisi est à titre d'exemple)
		Handler:           nil,               // listes des handlers
		ReadHeaderTimeout: 10 * time.Second,  // temps autorisé pour lire les headers
		WriteTimeout:      10 * time.Second,  // temps maximum d'écriture de la réponse
		IdleTimeout:       120 * time.Second, // temps maximum entre deux rêquetes
		MaxHeaderBytes:    1 << 20,           // 1 MB // maxinmum de bytes que le serveur va lire
	}
	fmt.Println("http://localhost:8080/home")
	if err := srv.ListenAndServe(); err != nil {
		log.Fatal(err)
	}
}

func VerifText(s string) bool {
	for _, i := range s {
		if i == 10 || i == 13 {
			continue
		}
		if i < 32 || i > 126 {
			return false
		}
	}
	return true
}
