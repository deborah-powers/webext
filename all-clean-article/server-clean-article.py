#!/usr/bin/python3.9
# -*- coding: utf-8 -*-
from sys import path
path.append ('C:\\Users\\deborah.powers\\Desktop\\python')
import json
from http.server import HTTPServer, SimpleHTTPRequestHandler, test
import socketserver
from urllib.parse import unquote
from htmlCls import Html
import textFct
from fileCls import Article
import loggerFct as log

htmlTest = """<html>
<head><title>conseil</title></head>
<body>
<h1>pour retrouver l'ancien affichage, clicquer sur le bouton "précédent".</h1>
</body></html>
"""
fileHtml = Html ('b/\t.html')

def cleanTitle (title):
	chars = "\t\n\\'.:;,_-/"
	for char in chars: title = title.replace (char,' ')
	title = title.strip()
	title = title.lower()
	while '  ' in title: title = title.replace ('  ',' ')
	return title

class BackEndCors (SimpleHTTPRequestHandler):
	def end_headers (self):
		self.send_header ('Access-Control-Allow-Origin', '*')
		self.send_header ('Access-Control-Allow-Methods', '*')
		self.send_header ('Access-Control-Allow-Headers', '*')
	#	self.send_header ('Content-type', 'application/json')
		SimpleHTTPRequestHandler.end_headers (self)

	def readBody (self):
		# rfile.read renvoie un texte en byte, il faut le transformer en string
		bodyLen = int (self.headers.get ('Content-Length'))
		bodyText =""
		if bodyLen >0: bodyText = self.rfile.read (bodyLen).decode('utf-8')
		print (bodyText)
		bodyJson = json.loads (bodyText)
		return bodyJson

	def writeBodyJson (self, jsonDict):
		# wfile.write prend un texte en bytes comme argument, il faut parser les strings
		jsonDict = { 'nom': 'carroussi', 'prenon': 'diana' }
		jsonText = json.dumps (jsonDict)
		self.wfile.write (bytes (jsonText, 'utf-8'))
	#	self.wfile.close()

	def writeBody (self, text):
		# wfile.write prend un texte en bytes comme argument, il faut parser les strings
		self.wfile.write (bytes (text, 'utf-8'))
	#	self.wfile.close()

	def do_GET (self):
		# récupérer les paramètres
		d=6+ self.path.find ('title=')
		paramsStr = unquote (self.path[d:])
		paramsStr = paramsStr.replace ('=','&', 4)
		paramLst = paramsStr.split ('&')
		fileHtml.path = 'b/\t.html'
		fileHtml.title = textFct.cleanHtml (paramLst[0])
		fileHtml.title = fileHtml.title[:100].strip()
		fileHtml.toPath()
		fileHtml.author = paramLst[4]
		fileHtml.subject = paramLst[2]
		fileHtml.link = paramLst[6]
		fileHtml.text = paramLst[8]
		fileHtml.write()
		# envoi sur la page
		self.send_response (200)
		self.end_headers()
		self.wfile.write (bytes (htmlTest, 'utf-8'))
		"""
		# redirection automatique. la mise en page de mon extension est perdue.
		self.send_response (307)
		self.send_header ('Location', fileHtml.link)
		self.end_headers()
		"""

	def do_POST (self):
		print ('post bis')
		self.send_response (200)
		self.end_headers()
		self.writeBody ('ok')
		postBody = self.readBody()
		fileHtml.path = 'b/\t.html'
		fileHtml.title = textFct.cleanHtml (postBody['title'])
		fileHtml.title = fileHtml.title[:100].strip()
		fileHtml.toPath()
		# fileHtml.title = cleanTitle (fileHtml.title)
		fileHtml.text = textFct.cleanHtml (postBody['text'])
		fileHtml.link = postBody['link']
		fileHtml.author = postBody['author']
		fileHtml.subject = postBody['subject']
		article = fileHtml.toText()
		if article: article.write()
		else: fileHtml.write()

port = 1407
url = 'localhost'
handler = BackEndCors
httpd = socketserver.TCPServer ((url, port), handler)
print ("serving at port", port)
httpd.serve_forever()

"""
if __name__ == '__main__':
	test (BackEndCors, HTTPServer, port=1407)

url correspondant à index.html
http://localhost:1407/
si je rajoute une fonction do_GET à ma classe, le html du fichier est écrasé.
il faut générer du nouveau html dynamiquement grâce à self.wfile()

pour utiliser mon server avec une extension, trouver l'ip v4 publique de mon ordi.
cette manip est dangereuse, je refuse de le faire.
https://www.whatismyip.com/
à la maison: http://109.13.137.75:1407/

pour utiliser le script comme back-end dans un fichier js
const url = 'http://localhost:1407/server.py';
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function(){ if (this.readyState ==4) console.log (this.responseText); };
xhttp.open ('GET', url, true);
xhttp.send();
"""