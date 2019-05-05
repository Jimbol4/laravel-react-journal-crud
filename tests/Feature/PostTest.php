<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithoutMiddleware;

class PostTest extends TestCase
{

    use RefreshDatabase;

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testItLoadsTheHomePage()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function testAnUnauthenticatedUserGetsRedirected()
    {
        $response = $this->get('/home');

        $response->assertRedirect('/login');
    }

    public function test_an_authenticated_user_can_see_the_app()
    {
        $user = factory('App\User')->create();
        $this->be($user);

        $response = $this->get('/home');

        $response->assertStatus(200);
        $response->assertSee('Laravel React Journal CRUD App Example');
    }

    public function test_a_token_is_needed_to_request_resources()
    {
        $response = $this->json('GET', '/api/posts');

        $response->assertStatus(401);
    }

    public function test_an_authenticated_user_can_create_posts()
    {
        $user = factory('App\User')->create();
        $this->be($user);

        $response = $this->json('POST', '/api/posts', [
            'api_token' => $user->api_token,
            'title' => 'This is a test title',
            'body' => 'This is a test body',
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('posts', [
            'title' => 'This is a test title'
        ]);
    }

    public function test_a_post_requires_a_title() 
    {
        $user = factory('App\User')->create();
        $this->be($user);

        $response = $this->json('POST', '/api/posts', [
            'api_token' => $user->api_token,
            'body' => 'This is a test body alone',
        ]);

        $response->assertStatus(422);
        $this->assertDatabaseMissing('posts', [
            'body' => 'This is a test body alone',
        ]);
    }

    public function test_a_post_requires_a_body() 
    {
        $user = factory('App\User')->create();
        $this->be($user);

        $response = $this->json('POST', '/api/posts', [
            'api_token' => $user->api_token,
            'title' => 'This is a test title alone',
        ]);

        $response->assertStatus(422);
        $this->assertDatabaseMissing('posts', [
            'title' => 'This is a test title alone',
        ]);
    }

    public function test_a_user_can_view_their_posts()
    {
        $user = factory('App\User')->create();
        $this->be($user);

        $post = factory('App\Post')->create([
            'user_id' => $user->id,
            'title' => 'Test Created Title',
        ]);
        
        $response = $this->json('GET', '/api/posts/' . $post->id, [
            'api_token' => $user->api_token,
        ]);

        $response->assertSee('Test Created Title');
    }

    public function test_a_user_can_update_their_post()
    {
        $user = factory('App\User')->create();
        $this->be($user);

        $post = factory('App\Post')->create([
            'user_id' => $user->id,
            'title' => 'Test Updated Title',
        ]);

        $response = $this->json('PUT', '/api/posts/' . $post->id, [
            'api_token' => $user->api_token,
            'title' => 'New Updated Title',
            'body' => $post->body,
        ]);
        
        $response->assertStatus(200);
        $this->assertDatabaseHas('posts', [
            'title' => 'New Updated Title',
        ]);

    }

    public function test_a_user_can_delete_their_post()
    {
        $user = factory('App\User')->create();
        $this->be($user);

        $post = factory('App\Post')->create([
            'user_id' => $user->id,
            'title' => 'Test Post Delete'
        ]);

        $response = $this->json('DELETE', '/api/posts/' . $post->id, [
            'api_token' => $user->api_token,
        ]);
        
        $response->assertStatus(204);
        $this->assertDatabaseMissing('posts', [
            'title' => 'Test Post Delete',
        ]);
    }

    public function test_a_user_cannot_view_other_posts()
    {
        $user_one = factory('App\User')->create();

        $post = factory('App\Post')->create([
            'user_id' => $user_one->id,
        ]);

        $user_two = factory('App\User')->create();
        $this->be($user_two);

        $response = $this->json('GET', '/api/posts/' . $post->id, [
            'api_token' => $user_two->api_token,
        ]);

        $response->assertStatus(403);
    }

    public function test_a_user_cannot_update_other_posts()
    {
        $user_one = factory('App\User')->create();

        $post = factory('App\Post')->create([
            'user_id' => $user_one->id,
        ]);

        $user_two = factory('App\User')->create();
        $this->be($user_two);

        $response = $this->json('PATCH', '/api/posts/' . $post->id, [
            'api_token' => $user_two->api_token,
            'title' => 'New Title',
            'body' => 'New Body',
        ]);

        $response->assertStatus(403);
        $this->assertDatabaseHas('posts', [
            'title' => $post->title,
        ]);
    }

    public function test_a_user_cannot_delete_other_posts()
    {
        $user_one = factory('App\User')->create();

        $post = factory('App\Post')->create([
            'user_id' => $user_one->id,
        ]);

        $user_two = factory('App\User')->create();
        $this->be($user_two);

        $response = $this->json('DELETE', '/api/posts/' . $post->id, [
            'api_token' => $user_two->api_token,
        ]);

        $response->assertStatus(403);
        $this->assertDatabaseHas('posts', [
            'title' => $post->title,
        ]);
    }




}
