docker build -t junderscore/twitchbot .
docker run -d --name twitchbot -p 80:80 -p 8080:8080 junderscore/twitchbot
docker exec -it twitchbot /bin/bash

docker rm -vf $(docker ps -a -q)
docker rmi -f $(docker images -a -q)
