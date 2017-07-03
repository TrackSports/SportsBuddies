# base image
FROM microsoft/dotnet:1.0.0-preview2-sdk

# We don't really need to set this, which should be taken care of by container ENV variable
# ENV ASPNETCORE_ENVIRONMENT="Development"

# make sure apt-get is up to date
# RUN apt-get update
# RUN apt-get upgrade -y

# install sqlite3 (not necessarily unless we want to use sqlite)
# RUN echo "deb http://ftp.us.debian.org/debian jessie main" >> /etc/apt/sources.list
# RUN apt-get install sqlite3 libsqlite3-dev

# copy everything to app directory in container
COPY . /app

# client build (js, css, etc.)
WORKDIR /app

# install node
# RUN curl -sL https://deb.nodesource.com/setup_4.x | bash -
# RUN apt-get -y install nodejs

# run client build
# RUN sh build_client.sh

# restore nuget packages
WORKDIR /app/server
RUN ["dotnet", "restore", "--configfile", "/app/Nuget.config"]

# build asp.net
WORKDIR /app/server/InfoTrack.Flexit.Web
RUN ["dotnet", "build"]

# run task - spin up asp.net application
EXPOSE 5000
ENTRYPOINT ["dotnet", "run"]