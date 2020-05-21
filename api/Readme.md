## Push do heroku folderu api z głównego katalogu repozytorium

```
git subtree push --prefix api heroku master
```

## Uruchamianie testów

Wszystkie testy korzystają z tej samej bazy lokalnej. Dlatego nie mogą być uruchamiane asynchronicznie (JEST domyślnie uruchamia osobne pliki z testami asynchronicznie). Dodatkowo przed wykonaniem skryptu 'test' uruchamiany jest skrypt 'pretest', który przygotowuje bazę. Powinien być uruchomiany przed każdym plikiem z testami, aby zresetować stan bazy.
Najłatwiej ograniczyć uruchomienie testów do jednego pliku za pomocą komend:

```
npm test -- services
npm test -- routes
```

Analogicznie, jeśli pojawią się kolejne pliki.
