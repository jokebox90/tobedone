<?php

namespace App\DataFixtures;

use App\Entity\Author;
use App\Entity\Tag;
use App\Entity\Task;
use DateTime;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        // $product = new Product();
        // $manager->persist($product);
        $dateNow = new DateTime();

        $author = new Author();
        $author->setUsername( 'demouser' );
        $author->setEmail( 'demouser@example.org' );
        $author->setPassword( '$2y$13$cjcj0MbCoTRZlLjDLCL9Y..56EXE0YHPnw30g2pn59fjlq7Rgj2Zu' );
        $author->setCreatedAt( $dateNow );
        $author->setLastLoginAt( $dateNow );

        $manager->persist( $author );

        $one = new Tag();
        $one->setWord( 'one' );
        $one->setAuthor( $author );
        $one->setCreatedAt( $dateNow );
        $one->setModifiedAt( $dateNow );

        $manager->persist( $one );

        $two = new Tag();
        $two->setWord( 'two' );
        $two->setAuthor( $author );
        $two->setCreatedAt( $dateNow );
        $two->setModifiedAt( $dateNow );

        $manager->persist( $two );

        $three = new Tag();
        $three->setWord( 'three' );
        $three->setAuthor( $author );
        $three->setCreatedAt( $dateNow );
        $three->setModifiedAt( $dateNow );

        $manager->persist( $three );

        $sport = new Task();
        $sport->setTitle( 'sport' );
        $sport->setDescription( '<p>I\'m playing !</p>' );
        $sport->setStatus( 'terminated' );
        $sport->setAuthor( $author );
        $sport->setCreatedAt( $dateNow );
        $sport->setModifiedAt( $dateNow );

        $manager->persist( $sport );

        $work = new Task();
        $work->setTitle( 'work' );
        $work->setDescription( '<p>I\'m working !</p>' );
        $work->setStatus( 'started' );
        $work->setAuthor( $author );
        $work->setCreatedAt( $dateNow );
        $work->setModifiedAt( $dateNow );

        $manager->persist( $work );

        $sleep = new Task();
        $sleep->setTitle( 'sleep' );
        $sleep->setDescription( '<p>I\'m sleeping !</p>' );
        $sleep->setStatus( 'created' );
        $sleep->setAuthor( $author );
        $sleep->setCreatedAt( $dateNow );
        $sleep->setModifiedAt( $dateNow );

        $manager->persist( $sleep );

        $manager->flush();
    }
}
