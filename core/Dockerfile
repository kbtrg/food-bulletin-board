#Docker Hubからruby:3.1.2のイメージをプルする
FROM ruby:3.1.2

ENV APP /usr/src/app

# docker内の作業ディレクトリを作成＆設定
WORKDIR $APP

# Gemfile,Gemfile.lockをローカルからCOPY
COPY Gemfile Gemfile.lock $APP/

# コンテナ内にコピーしたGemfileを用いてbundel install
RUN bundle install

# railsを起動する
CMD ["rails", "server", "-b", "0.0.0.0", "-p", "3000"]