package main

import (
	"github.com/stretchr/goweb"
	"github.com/stretchr/goweb/context"
	"log"
	"net"
	"net/http"
	"os"
	"os/signal"
	"time"
)

const (
	Address string = ":8080"
	Version string = "0.0.1"
)


func mapRoutes() {
	goweb.MapBefore(func(c context.Context) error {
		// Any pre-handlers go here

		return nil
	})

	goweb.MapAfter(func(c context.Context) error {
		// Any post-handlers go here
		// Todo: Log Request
		return nil
	})

	goweb.MapStatic("/", "public/")
}

func main() {
	mapRoutes()

	log.Println("MDLive -", Version)
	log.Println("By Brady Love (http://github.com/bradylove)")
	log.Println("Starting server on port", Address)

	server := &http.Server{
		Addr:           Address,
		Handler:        goweb.DefaultHttpHandler(),
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}

	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt)

	listener, listenErr := net.Listen("tcp", Address)
	if listenErr != nil {
		log.Fatalf("Could not listen: %s", listenErr)
	}

	log.Println("Available Routes")
	log.Println(goweb.DefaultHttpHandler())

	go func() {
		for _ = range c {
			log.Println("Stoping the server...")
			listener.Close()

			log.Println("Done, bye!")
		}
	}()

	// Start the server
	log.Fatalf("Error in server: %s", server.Serve(listener))
}
