@extends('layouts.app')

@section('content')
<main role="main">

  <section class="jumbotron text-center">
    <div class="container">
      <h1 class="jumbotron-heading">Laravel React Example App</h1>
      <p class="lead text-muted">This is an example application built on a Laravel back end and using a React application (and axios) on the front end.</p>
      <p>
        <a href="#" class="btn btn-primary my-2">Create a new post</a>
        <a href="https://www.github.com/Jimbol4/laravel-react-journal-crud" class="btn btn-secondary my-2">View on GitHub</a>
      </p>
    </div>
  </section>

  <div id="root"></div>

@endsection
