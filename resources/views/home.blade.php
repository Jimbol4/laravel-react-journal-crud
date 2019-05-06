@extends('layouts.app')

@section('content')
<div class="container">

<section class="jumbotron text-center">
    <div class="container">
      <h1 class="jumbotron-heading">Laravel React CRUD Example</h1>
      <p class="lead text-muted">Click a post on the left to view it. Add a new post, or update/delete a selected post.</p>
      <p class="lead text-muted">Built on a Laravel Backend and a React Frontend.</p>
    </div>
  </section>

  <div id="root"></div>
</div>
@endsection
