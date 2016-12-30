#!/usr/bin/env bash
bundle exec htmlproofer ./public \
    --disable-external \
    --check-html \
    --assume-extension
